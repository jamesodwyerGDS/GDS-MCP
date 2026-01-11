// GDS Helper - Figma Plugin Main Code

// Configuration - Update this with your deployed backend URL
const BACKEND_URL = 'http://localhost:3001/api/chat';

// Show the UI
figma.showUI(__html__, {
  width: 380,
  height: 600,
  themeColors: true
});

// Track selection changes
figma.on('selectionchange', () => {
  sendSelectionToUI();
});

// Send current selection to UI
function sendSelectionToUI() {
  const selection = figma.currentPage.selection;
  const selectionData = selection.map(node => extractNodeData(node));

  figma.ui.postMessage({
    type: 'selection-change',
    selection: selectionData
  });
}

// Extract relevant data from a Figma node
function extractNodeData(node: SceneNode): NodeData {
  const data: NodeData = {
    id: node.id,
    name: node.name,
    type: node.type,
  };

  // Add dimensions if available
  if ('width' in node && 'height' in node) {
    data.width = Math.round(node.width);
    data.height = Math.round(node.height);
  }

  // Add component info if it's a component or instance
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    data.isComponent = true;
    if ('description' in node) {
      data.description = node.description;
    }
  }

  if (node.type === 'INSTANCE') {
    data.isInstance = true;
    const mainComponent = node.mainComponent;
    if (mainComponent) {
      data.componentName = mainComponent.name;
      data.componentSetName = mainComponent.parent?.type === 'COMPONENT_SET'
        ? mainComponent.parent.name
        : undefined;
    }
  }

  // Add fill info if available
  if ('fills' in node && Array.isArray(node.fills) && node.fills.length > 0) {
    const solidFill = node.fills.find((f: Paint) => f.type === 'SOLID' && f.visible !== false) as SolidPaint | undefined;
    if (solidFill && solidFill.color) {
      data.fillColor = rgbToHex(solidFill.color);
    }
  }

  // Add text properties if it's a text node
  if (node.type === 'TEXT') {
    data.fontSize = typeof node.fontSize === 'number' ? node.fontSize : undefined;
    data.fontFamily = typeof node.fontName === 'object' ? node.fontName.family : undefined;
    data.characters = node.characters.substring(0, 100);
  }

  // Add auto-layout properties if available
  if ('layoutMode' in node && node.layoutMode !== 'NONE') {
    data.layoutMode = node.layoutMode;
    data.itemSpacing = node.itemSpacing;
    data.paddingTop = node.paddingTop;
    data.paddingRight = node.paddingRight;
    data.paddingBottom = node.paddingBottom;
    data.paddingLeft = node.paddingLeft;
  }

  // Add corner radius if available
  if ('cornerRadius' in node) {
    data.cornerRadius = typeof node.cornerRadius === 'number' ? node.cornerRadius : 'mixed';
  }

  // Add effects (shadows, blur)
  if ('effects' in node && Array.isArray(node.effects) && node.effects.length > 0) {
    data.effects = node.effects
      .filter((e: Effect) => e.visible !== false)
      .map((e: Effect) => e.type);
  }

  return data;
}

// Convert RGB to hex
function rgbToHex(color: RGB): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Build context string from selection
function buildSelectionContext(selection: NodeData[]): string {
  if (!selection || selection.length === 0) {
    return 'No elements are currently selected in Figma.';
  }

  const parts: string[] = ['Currently selected in Figma:'];

  selection.forEach((node, index) => {
    const details: string[] = [];

    details.push(`- **${node.name}** (${node.type})`);

    if (node.width && node.height) {
      details.push(`  Size: ${node.width}x${node.height}px`);
    }

    if (node.isInstance && node.componentName) {
      details.push(`  Instance of: ${node.componentSetName || node.componentName}`);
    }

    if (node.fillColor) {
      details.push(`  Fill: ${node.fillColor}`);
    }

    if (node.fontSize) {
      details.push(`  Font: ${node.fontFamily || 'Unknown'} ${node.fontSize}px`);
    }

    if (node.layoutMode) {
      details.push(`  Layout: ${node.layoutMode}, spacing: ${node.itemSpacing}px`);
      details.push(`  Padding: ${node.paddingTop}/${node.paddingRight}/${node.paddingBottom}/${node.paddingLeft}`);
    }

    if (node.cornerRadius !== undefined) {
      details.push(`  Corner radius: ${node.cornerRadius}px`);
    }

    if (node.effects && node.effects.length > 0) {
      details.push(`  Effects: ${node.effects.join(', ')}`);
    }

    parts.push(details.join('\n'));
  });

  return parts.join('\n\n');
}

// Handle messages from UI
figma.ui.onmessage = async (msg: PluginMessage) => {
  if (msg.type === 'get-selection') {
    sendSelectionToUI();
  }
  else if (msg.type === 'chat-message') {
    await handleChatMessage(msg.message, msg.selection, msg.history);
  }
};

// Send chat message to backend
async function handleChatMessage(
  message: string,
  selection: NodeData[] | null,
  history: ConversationMessage[]
) {
  try {
    const selectionContext = buildSelectionContext(selection || []);

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        selectionContext,
        history
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    figma.ui.postMessage({
      type: 'chat-response',
      content: data.response
    });
  } catch (error) {
    console.error('Chat error:', error);
    figma.ui.postMessage({
      type: 'chat-error',
      error: error instanceof Error ? error.message : 'Failed to get response'
    });
  }
}

// Type definitions
interface NodeData {
  id: string;
  name: string;
  type: string;
  width?: number;
  height?: number;
  isComponent?: boolean;
  isInstance?: boolean;
  description?: string;
  componentName?: string;
  componentSetName?: string;
  fillColor?: string;
  fontSize?: number;
  fontFamily?: string;
  characters?: string;
  layoutMode?: string;
  itemSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  cornerRadius?: number | 'mixed';
  effects?: string[];
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface PluginMessage {
  type: string;
  message?: string;
  selection?: NodeData[];
  history?: ConversationMessage[];
}

# Setting Up GDS-MCP with Cursor - Beginner's Guide

A step-by-step guide to get the Global Design System documentation working in Cursor. No coding experience required!

---

## What You'll Need Before Starting

1. **A computer** running macOS, Windows, or Linux
2. **Cursor IDE** - Download free from [cursor.sh](https://cursor.sh)
3. **Node.js** - Download free from [nodejs.org](https://nodejs.org) (choose the "LTS" version)

---

## Option A: Quick Setup (Easiest - No Download Required)

If you just want to access GDS documentation without downloading anything:

### Step 1: Open Cursor Settings

1. Open Cursor
2. Press these keys together:
   - **Mac:** `Cmd + ,` (Command and comma)
   - **Windows/Linux:** `Ctrl + ,` (Control and comma)

### Step 2: Find MCP Settings

1. In the settings search bar, type: `mcp`
2. Look for "MCP Servers" or similar
3. Click to edit the settings file

### Step 3: Add This Configuration

Copy and paste this entire block:

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "gds-docs": {
      "url": "https://gitmcp.io/jamesodwyerGDS/GDS-MCP"
    }
  }
}
```

### Step 4: Save and Restart

1. Save the file (`Cmd + S` on Mac, `Ctrl + S` on Windows)
2. Completely close Cursor (quit the app)
3. Open Cursor again

### Step 5: Test It Works

In Cursor's AI chat, type:
```
What button variants are available in GDS?
```

If you get an answer about button variants, it's working!

---

## Option B: Full Local Setup (More Features)

This gives you all features including documentation generation.

### Step 1: Install Node.js

1. Go to [nodejs.org](https://nodejs.org)
2. Click the big green button that says **"LTS"** (Long Term Support)
3. Open the downloaded file
4. Follow the installer - just click "Next" or "Continue" through all screens
5. **Restart your computer** after installation

#### How to Check Node.js Installed Correctly

**On Mac:**
1. Open "Terminal" (search for it in Spotlight with `Cmd + Space`)
2. Type `node --version` and press Enter
3. You should see a number like `v20.10.0`

**On Windows:**
1. Open "Command Prompt" (search for it in Start menu)
2. Type `node --version` and press Enter
3. You should see a number like `v20.10.0`

---

### Step 2: Download GDS-MCP

**Option A: Download as ZIP (Easiest)**

1. Go to [github.com/jamesodwyerGDS/GDS-MCP](https://github.com/jamesodwyerGDS/GDS-MCP)
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Find the downloaded ZIP file and unzip it:
   - **Mac:** Double-click the ZIP file
   - **Windows:** Right-click → "Extract All"
5. Move the folder somewhere you'll remember (like your Documents folder)

**Option B: Using Terminal/Command Prompt**

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to where you want to save it:
   ```
   cd Documents
   ```
3. Download:
   ```
   git clone https://github.com/jamesodwyerGDS/GDS-MCP.git
   ```

---

### Step 3: Install Required Files

1. Open Terminal (Mac) or Command Prompt (Windows)

2. Navigate to the GDS-MCP folder. Type this command (adjust the path to where you saved it):

   **Mac:**
   ```
   cd ~/Documents/GDS-MCP
   ```

   **Windows:**
   ```
   cd C:\Users\YourName\Documents\GDS-MCP
   ```

3. Install dependencies by typing:
   ```
   npm install
   ```

4. Wait for it to finish (may take 1-2 minutes)

#### What Success Looks Like
You should see text scrolling by, ending with something like:
```
added 45 packages in 12s
```

---

### Step 4: Find Your GDS-MCP Folder Path

You'll need the exact location of your GDS-MCP folder.

**On Mac:**
1. Open Finder
2. Navigate to your GDS-MCP folder
3. Right-click on the folder
4. Hold `Option` key and click "Copy GDS-MCP as Pathname"
5. It will look like: `/Users/yourname/Documents/GDS-MCP`

**On Windows:**
1. Open File Explorer
2. Navigate to your GDS-MCP folder
3. Click in the address bar at the top
4. Copy the path
5. It will look like: `C:\Users\yourname\Documents\GDS-MCP`

**Write this path down - you'll need it in the next step!**

---

### Step 5: Configure Cursor

Now we'll tell Cursor where to find GDS-MCP.

#### Find the Settings File

**On Mac:**
1. Open Finder
2. Press `Cmd + Shift + G` (Go to Folder)
3. Paste this path:
   ```
   ~/Library/Application Support/Cursor/User/globalStorage/cursor.mcp
   ```
4. Press Enter
5. If the folder doesn't exist, you may need to create it

**On Windows:**
1. Press `Windows + R` (opens Run dialog)
2. Paste this path:
   ```
   %APPDATA%\Cursor\User\globalStorage\cursor.mcp
   ```
3. Press Enter

#### Create or Edit the Settings File

1. Look for a file called `settings.json`
   - If it exists: Open it with any text editor
   - If it doesn't exist: Create a new file called `settings.json`

2. Replace everything in the file with this (or add if empty):

**For Mac** (replace `/Users/yourname/Documents/GDS-MCP` with YOUR path from Step 4):
```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "gds": {
      "command": "node",
      "args": ["./mcp-server/index.js"],
      "cwd": "/Users/yourname/Documents/GDS-MCP"
    }
  }
}
```

**For Windows** (replace the path with YOUR path from Step 4, note the double backslashes):
```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "gds": {
      "command": "node",
      "args": ["./mcp-server/index.js"],
      "cwd": "C:\\Users\\yourname\\Documents\\GDS-MCP"
    }
  }
}
```

3. Save the file

---

### Step 6: Restart Cursor

1. If Cursor is open, quit it completely:
   - **Mac:** `Cmd + Q`
   - **Windows:** `Alt + F4` or File → Exit
2. Wait a few seconds
3. Open Cursor again

---

### Step 7: Test Everything Works

In Cursor's AI chat, try asking:

```
What components are available in the GDS documentation?
```

Or:

```
Search the GDS docs for button styling
```

If you get helpful answers about GDS components, congratulations - it's working!

---

## Troubleshooting Common Problems

### "I can't find the settings file location"

The folder might not exist yet. You can create it:

**Mac:**
1. Open Terminal
2. Run: `mkdir -p ~/Library/Application\ Support/Cursor/User/globalStorage/cursor.mcp`

**Windows:**
1. Open Command Prompt
2. Run: `mkdir "%APPDATA%\Cursor\User\globalStorage\cursor.mcp"`

Then create a new file called `settings.json` in that folder.

---

### "Node.js command not found"

This usually means Node.js didn't install properly.

1. Restart your computer
2. Try the `node --version` command again
3. If still not working, reinstall Node.js from [nodejs.org](https://nodejs.org)

---

### "npm install shows errors"

1. Make sure you're in the right folder (the one containing `package.json`)
2. Try deleting the `node_modules` folder if it exists, then run `npm install` again
3. Make sure you have internet connection

---

### "Cursor doesn't recognize the MCP server"

1. Double-check your path in `settings.json` - it must be exact
2. Make sure there are no typos in the JSON (missing commas, brackets, etc.)
3. Use an online JSON validator: [jsonlint.com](https://jsonlint.com)
4. Restart Cursor completely (quit and reopen)

---

### "I get permission errors"

**Mac:** You may need to allow Terminal to access folders. Go to:
System Preferences → Security & Privacy → Privacy → Full Disk Access → Add Terminal

**Windows:** Try running Command Prompt as Administrator (right-click → Run as administrator)

---

## Getting Help

If you're still stuck:

1. Take a screenshot of any error messages
2. Note which step you're on
3. Ask for help on the [GitHub Issues page](https://github.com/jamesodwyerGDS/GDS-MCP/issues)

---

## What You Can Do Now

Once set up, you can ask Cursor's AI assistant things like:

- "What button variants are in GDS?"
- "Show me the spacing tokens"
- "How do I use the Modal component?"
- "What colours are available in the design system?"
- "Search GDS for form components"

The AI will have access to all the GDS documentation to help you!

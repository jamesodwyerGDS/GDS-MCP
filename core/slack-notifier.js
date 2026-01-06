/**
 * Slack Notifier
 *
 * Sends notifications to Slack when documentation is generated or updated.
 */

export class SlackNotifier {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl || process.env.SLACK_WEBHOOK_URL;
  }

  /**
   * Check if Slack notifications are configured
   */
  isConfigured() {
    return !!this.webhookUrl;
  }

  /**
   * Send a notification to Slack
   * @param {object} payload - Slack message payload
   */
  async send(payload) {
    if (!this.isConfigured()) {
      return { success: false, reason: 'No webhook URL configured' };
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.warn('Slack notification failed:', error.message);
      return { success: false, reason: error.message };
    }
  }

  /**
   * Notify when documentation is generated
   * @param {object} result - Generation result { name, path, category }
   */
  async notifyDocGenerated(result) {
    const payload = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Documentation Generated',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Component:*\n${result.name}`
            },
            {
              type: 'mrkdwn',
              text: `*Category:*\n${result.category}`
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Path:*\n\`${result.path}\``
          }
        }
      ]
    };

    return this.send(payload);
  }

  /**
   * Notify when batch generation completes
   * @param {object[]} results - Array of generation results
   */
  async notifyBatchComplete(results) {
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    const payload = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Batch Documentation Complete',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Successful:*\n${successful}`
            },
            {
              type: 'mrkdwn',
              text: `*Failed:*\n${failed}`
            }
          ]
        }
      ]
    };

    if (failed > 0) {
      const failedItems = results
        .filter(r => !r.success)
        .map(r => `- ${r.url}: ${r.error}`)
        .join('\n');

      payload.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Failures:*\n${failedItems}`
        }
      });
    }

    return this.send(payload);
  }

  /**
   * Notify when an error occurs
   * @param {string} message - Error message
   * @param {object} context - Additional context
   */
  async notifyError(message, context = {}) {
    const payload = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Documentation Error',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Error:*\n${message}`
          }
        }
      ]
    };

    if (Object.keys(context).length > 0) {
      payload.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Context:*\n\`\`\`${JSON.stringify(context, null, 2)}\`\`\``
        }
      });
    }

    return this.send(payload);
  }
}

export default SlackNotifier;

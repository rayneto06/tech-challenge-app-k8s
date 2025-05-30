"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExternalPaymentWebhookController {
    constructor(handleExternalPaymentWebhook) {
        this.handleExternalPaymentWebhook = handleExternalPaymentWebhook;
    }
    async handle(req, res) {
        try {
            await this.handleExternalPaymentWebhook.execute(req.body);
            res.status(200).send('Webhook processed successfully');
        }
        catch (error) {
            console.error('Error processing external payment webhook:', error);
            res.status(500).send('Error processing webhook');
        }
    }
}
exports.default = ExternalPaymentWebhookController;
//# sourceMappingURL=webhook.js.map
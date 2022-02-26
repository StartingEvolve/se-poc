export default class BotpressConfig {
  constructor() {
    this.client = this.init();
  }

  init() {
    return window.botpressWebChat.init({
      host: 'http://localhost:3000',
      botId: 'starting-evolve-chatbot'
    });
  }

  getClient() {
    return this.client;
  }

  destroy() {
    this.client.destroy();
  }

  rebuild() {
    return this.client.rebuild();
  }
}

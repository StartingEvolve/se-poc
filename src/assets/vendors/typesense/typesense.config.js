export default class TypesenseConfig {
  constructor() {
    this.client = this.init();
  }

  init() {
    return new window.Typesense.Client({
      nodes: [
        {
          host: '6ve2qm9cwxt7ka0hp-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
          port: '443',
          protocol: 'https'
        }
      ],
      apiKey: 'NaHIHgn2g1D9PtUTIEG6L5qNs6tsfwBK',
      connectionTimeoutSeconds: 10,
      retryIntervalSeconds: 0.1,
      healthcheckIntervalSeconds: 2
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

export default class TypesenseConfig {
    constructor() {
        this.client = this.init();
    }

    init() {
        return window.Typesense.Client({
            'nodes': [{
                'host': 'ulz2oqrx4ist0bayp-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
                'port': '443',
                'protocol': 'https'
            }],
            'apiKey': 'VDmo2Lkl9YzuFuPbhRcHpRZhOeSwWzr5',
            'connectionTimeoutSeconds': 2
        })
    }

    destroy() {
        this.client.destroy();
    }

    rebuild() {
        return this.client.rebuild();
    }
}

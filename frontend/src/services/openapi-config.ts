import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './api-docs.json',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  outputFile: 'generatedCodeApi.ts',
  exportName: 'generatedCodeApi',
  hooks: { lazyQueries: true, queries: true, mutations: false },
};

export default config;

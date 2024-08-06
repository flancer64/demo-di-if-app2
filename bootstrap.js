// MODULE'S IMPORTS
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import Container from '@teqfw/di';

// MODULE'S FUNCS
/**
 * The preprocessor chunk to replace interfaces with the implementations in this app.
 * @implements TeqFw_Di_Api_Container_PreProcessor_Chunk
 */
const replaceChunk = {
    modify(depId, originalId, stack) {
        // FUNCS
        /**
         * @param {TeqFw_Di_DepId} id - structured data about interface
         * @param {string} nsImpl - the namespace for the implementation
         */
        function replace(id, nsImpl) {
            id.moduleName = nsImpl;
            return id;
        }

        // MAIN
        switch (originalId.moduleName) {
            case 'Trans_Api_Package':
                return replace(depId, 'Client2_Di_Package');
            case 'Trans_Api_Route':
                return replace(depId, 'Client2_Di_Route');
        }
        return depId;
    }
};

// MODULE'S MAIN
/* Resolve path to the root folder. */
const url = new URL(import.meta.url);
const script = fileURLToPath(url);
const current = dirname(script);
const scope = join(current, 'node_modules', '@flancer64');
const container = new Container();
const resolver = container.getResolver();
resolver.addNamespaceRoot('Client2_', join(current, 'src'));
resolver.addNamespaceRoot('Trans_', join(scope, 'demo-di-if-plugin', 'src'));
container.getPreProcessor().addChunk(replaceChunk);
/** @type {Client2_App} */
const app = await container.get('Client2_App$');
app.run();
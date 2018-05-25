import * as React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';
import { ApolloLink } from 'apollo-link';

import '../../utils/global.css';
import resolvers from './../../graphql/resolvers';
import Home from './../home';

const defaults = {
    networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: true,
    },
};

const cache = new InMemoryCache();
const stateLink = withClientState({
    cache,
    resolvers,
    defaults,
});

interface Lines {
    name: string;
    modeName: 'tube' | 'dlr';
    created: string;
    modified: string;
}
const addTypename = (typename: string, data: any[]) =>
    data
        ? data.map(res => ({
              __typename: typename,
              ...res,
          }))
        : data;

const restLink = new RestLink({
    uri: process.env.TFL_API,
    headers: {
        app_id: process.env.APP_ID,
        app_key: process.env.APP_KEY,
    },
    // If the returning data is nested adding a typepatcher allows
    // for adding a typename to the nested object or array
    typePatcher: {
        LineDetails: (
            data: any,
            outerType: string,
            patchDeeper: RestLink.FunctionalTypePatcher,
        ) => ({ ...data, stations: addTypename('Station', data.stations) }),
    },
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink, restLink, new HttpLink()]),
});

export default () => (
    <ApolloProvider client={client}>
        <Home />
    </ApolloProvider>
);
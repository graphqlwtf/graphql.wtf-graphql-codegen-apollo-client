import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Link from "next/link";

import { useClient } from "../lib/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useClient();

  return (
    <ApolloProvider client={apolloClient}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <header className="bg-gray-100 px-6 py-3 rounded-md flex items-center justify-between">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/cart">
            <a>Cart</a>
          </Link>
        </header>

        <div className="bg-white shadow p-6 rounded">
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default MyApp;

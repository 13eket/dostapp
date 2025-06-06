declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    gapi: {
      load: (library: string, callback: () => void) => void;
      auth2: {
        init: (params: { client_id: string }) => Promise<void>;
      };
      signin2: {
        render: (
          id: string,
          options: {
            scope: string;
            width: number;
            height: number;
            longtitle: boolean;
            theme: string;
            onsuccess: (googleUser: any) => void;
          },
        ) => void;
      };
    };
  }
}

export {};

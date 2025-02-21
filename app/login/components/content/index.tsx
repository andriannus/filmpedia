'use client';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { validateKey } from '@/app/shared/apis/account';
import AppButton from '@/app/shared/components/app-button';

import './styles.scss';
import AppLoader from '@/app/shared/components/app-loader';

function Content() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const authentication = async () => {
    setLoading(true);

    try {
      const res = await validateKey();
      setResponse(res);
    } catch (error) {
      const validError = error as AxiosError;
      setResponse(validError.response?.data || {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <AppButton
            onClick={() => {
              authentication();
            }}
          >
            Authenticate your API Key
          </AppButton>

          {Object.keys(response).length && (
            <pre className="code">{JSON.stringify(response, null, 2)}</pre>
          )}
        </>
      )}
    </>
  );
}

export default Content;

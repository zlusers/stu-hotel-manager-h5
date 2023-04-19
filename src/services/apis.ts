/* eslint-disable array-callback-return */
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { urls } from 'src/services/url';
import request from 'src/utils/request';

function defaultResultParse(res: AxiosResponse<any>) {
  try {
    const content = res.data;
    return content;
  } catch (error) {
    throw error;
  }
}

// 模糊搜索接口
export async function StockAPIStock({
  type,
}: {
  type: number;
}): Promise<any[]> {
  return request.post(urls.getPayTypeList, {
    data: {
      type
    },
  });
}

export function useQueryStockSearch({ type }: { type:number }) {
  const swrResult = useSWR(
    () => (type ? ['StockAPIStock', type] : null),
    () => StockAPIStock({ type }).then((res) => res)
  );
  return {
    ...swrResult,
    loading: !swrResult.data && !swrResult.error,
  };
}


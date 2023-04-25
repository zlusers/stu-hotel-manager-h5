import { useMemo } from 'react';
import { useQuerygetAllPayWay} from 'src/services/apis'


function useAllPayWay() {
  const { data: payWayList } =useQuerygetAllPayWay({type:true}) ;


  const resultList = useMemo(() => {
    if(payWayList) {
        return payWayList
    }

    return null;
  }, [payWayList]);

  return { data: resultList};
}

export default useAllPayWay;

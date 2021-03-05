/* global nodecg */
import React from "react";

type UseReplicantReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const useReplicant = <T>(initialValue: T, name: string): UseReplicantReturn<T> => {
  const replicant = nodecg.Replicant<T>(name, { defaultValue: initialValue });

  const [data, setData] = React.useState<T>(initialValue);
  const [once, setOnce] = React.useState(false);

  React.useEffect(() => {
    replicant.on("change", newValue => {
      if (newValue === data) {
        return;
      }

      setData(newValue);
    });
  }, []);

  React.useEffect(() => {
    // the first time that data and initialValue are equal,
    // which is the first time the effect is run,
    // then don't trigger the replicant in order to prevent it from being overwritten with the initialValue
    // because the replicant's persistent value would be useless otherwise (being always overwritten)
    if (!once && data === initialValue) {
      setOnce(true);
      return;
    }

    replicant.value = data;
  }, [data]);

  return [data, setData];
};

export default useReplicant;

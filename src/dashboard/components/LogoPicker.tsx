/* global nodecg */
import React from "react";
import AssetsReplicantValue from "../../shared/assets-replicant-value";

interface LogoPickerProps {
  logoURL: string
  setLogoURL: (value: React.SetStateAction<string>) => void
}

const logoRepositoryReplicant = nodecg.Replicant<AssetsReplicantValue[]>("assets:djlogos");

const emptyImageData = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

const LogoPicker: React.FC<LogoPickerProps> = ({ logoURL, setLogoURL }) => {
  const [logoRepository, setLogoRepository] = React.useState<AssetsReplicantValue[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    logoRepositoryReplicant.on("change", newValue => {
      setLoading(false);
      setLogoRepository(newValue);
    });
  }, []);

  return (
    <div
      className="is-flex is-flex-direction-column is-align-items-center"
      style={{ rowGap: "0.5rem" }}
    >
      <div className="select is-small is-fullwidth">
        <select
          value={logoURL}
          onChange={e => setLogoURL(e.currentTarget.value)}
        >
          <option value="">None{loading && " (Loading...)"}</option>
          {logoRepository.map(data => (
            <option
              key={data.url}
              value={data.url}
            >
              {data.base}
            </option>
          ))}
        </select>
      </div>
      <div
        className="is-flex is-justify-content-center is-align-items-center"
        style={{ width: "100%", height: 120, backgroundColor: "#EEE" }}
      >
        <img style={{ maxWidth: 300, maxHeight: 100 }} src={logoURL || emptyImageData}/>
      </div>
    </div>
  );
};

export default LogoPicker;

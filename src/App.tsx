import { useState, CSSProperties } from "react";
import { useCSVReader } from "react-papaparse";

function App() {
  const { CSVReader } = useCSVReader();
  const [header, setHeader] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);

  const handleOnDrop = (results: any) => {
    setHeader(results.data[0]);
    setData(results.data.slice(1, 4));
  };

  const styles = {
    csvReader: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    } as CSSProperties,
    browseFile: {
      width: "20%",
    } as CSSProperties,
    acceptedFile: {
      border: "1px solid #ccc",
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: "80%",
    } as CSSProperties,
    remove: {
      borderRadius: 0,
      padding: "0 20px",
    } as CSSProperties,
    progressBarBackgroundColor: {
      backgroundColor: "red",
    } as CSSProperties,
  };

  const optionsList = ["first_name", "last_name", "email", "Password"];

  const Options = ({ item }: { item: string }) => {
    console.log(optionsList.includes(item));
    const defaultValue = optionsList.includes(item) ? item : "";
    return (
      <>
        <select
          onChange={(event: any) => console.log(event.target.value)}
          style={{ border: defaultValue ? "5px solid green" : "" }}
          disabled={!defaultValue}
        >
          <option value={defaultValue}>{defaultValue}</option>
          {header
            .filter((value) => value !== defaultValue)
            ?.map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
        </select>
      </>
    );
  };

  return (
    <>
      <CSVReader onUploadAccepted={handleOnDrop}>
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <div style={styles.csvReader}>
              <button
                type="button"
                {...getRootProps()}
                style={styles.browseFile}
              >
                Browse file
              </button>
              <div style={styles.acceptedFile}>
                {acceptedFile && acceptedFile.name}
              </div>
              <button {...getRemoveFileProps()} style={styles.remove}>
                Remove
              </button>
            </div>
            <ProgressBar style={styles.progressBarBackgroundColor} />
          </>
        )}
      </CSVReader>
      <table>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th
                key={index}
                style={{ border: "1px solid black", padding: "0.25rem 1rem" }}
              >
                <Options item={item} />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((item, index) => (
                <td
                  key={index}
                  style={{ border: "1px solid black", padding: "0.25rem 1rem" }}
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;

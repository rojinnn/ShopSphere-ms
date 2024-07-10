import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useRef } from "react";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
  ],
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = ({
  label,
  value,
  handleChange,
  required = false,
  setImageId,
}) => {
  const editorRef = useRef(null);
  const handleEditorChange = async (content) => {
    handleChange(content);
  };

  return (
    <Stack>
      {!!label && (
        <StyleLabel>
          {label}
          {required && <span className="required-symbol">*</span>}
        </StyleLabel>
      )}
      {ReactQuill ? (
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={value}
          onChange={handleEditorChange}
          modules={{
            ...modules,
          }}
        />
      ) : (
        <p>Loading editor...</p>
      )}
    </Stack>
  );
};
export default TextEditor;
const StyleLabel = styled.label`
  line-height: 25px;
  font-weight: bold;

  span {
    color: red;
  }
  .required-symbol {
    color: red;
    margin-left: 4px;
    font-size: large;
  }
`;

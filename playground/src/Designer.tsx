import { useRef, useState } from "react";
import { Template, checkTemplate, Lang } from "@pdfme/common";
import { Designer } from "@pdfme/ui";
import {
  getFontsData,
  getTemplateByPreset,
  getPlugins, generatePDF,
} from "./helper";
import {templateVersion} from "./constants.ts";

const translations: { label: string, value: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'th', label: 'Thai' },
  { value: 'pl', label: 'Polish' },
  { value: 'it', label: 'Italian' },
  { value: 'de', label: 'German' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
]

function App() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [prevDesignerRef, setPrevDesignerRef] = useState<Designer | null>(null);

  const buildDesigner = () => {
    let template: Template = getTemplateByPreset(localStorage.getItem('templatePreset') || "");
    try {
      const templateString = localStorage.getItem("template");

      const templateJson = templateString
        ? JSON.parse(templateString)
        : getTemplateByPreset(localStorage.getItem('templatePreset') || "");
      checkTemplate(templateJson);
      template = templateJson as Template;
    } catch {
      localStorage.removeItem("template");
    }

    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
          options: {
            font,
            lang,
            labels: {
              'clear': '🗑️', // Add custom labels to consume them in your own plugins
            },
            theme: {
              token: {
                colorPrimary: '#25c2a0',
              },
            },
            icons: {
              multiVariableText: '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>',
              radioButtonGroup: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n' +
                  '  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none" />\n' +
                  '  <circle cx="12" cy="12" r="5" fill="currentColor" />\n' +
                  '</svg>\n'
            },
          },
          plugins: getPlugins(),
        });
        designer.current.onSaveTemplate(onSaveTemplate);
      }
    });
  }

  const onSaveTemplate = (template?: Template) => {

    if (designer.current) {
      const templateData = {
        ...template || designer.current.getTemplate(),
        templateVersion: templateVersion
      };
      localStorage.setItem(
        "template",
        JSON.stringify(templateData)
      );
      alert("Saved!");
    }
  };

  if (designerRef != prevDesignerRef) {
    if (prevDesignerRef && designer.current) {
      designer.current.destroy();
    }
    buildDesigner();
    setPrevDesignerRef(designerRef);
  }

  return (
      <div>
        <button onClick={() => onSaveTemplate()} style={{margin: 10}}>Save Template</button>
        <button onClick={() => generatePDF(designer.current)} style={{margin: 10}}>PDF</button>
        <div ref={designerRef} style={{width: '100%', height: `calc(100vh)`}}/>
      </div>
  );
}

export default App;

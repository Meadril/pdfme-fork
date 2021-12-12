import React from 'react';
import ReactDOM from 'react-dom';
import { BaseUIClass, TemplateDesignerProp, Template, UIProps } from './libs/type';
import { destroyedErrMsg } from './libs/constants';
import { I18nContext } from './libs/i18n';
import TemplateDesignerComponent from './components/TemplateDesigner';

class TemplateDesigner extends BaseUIClass {
  private saveTemplateCallback: (t: Template) => void;

  constructor(props: TemplateDesignerProp & UIProps) {
    const { domContainer, template, size, lang, saveTemplate } = props;
    super({ domContainer, template, size, lang });

    this.saveTemplateCallback = saveTemplate;
    this.render();
  }

  public saveTemplate() {
    if (!this.domContainer) throw new Error(destroyedErrMsg);
    this.saveTemplateCallback(this.template);
  }

  public updateTemplate(template: Template) {
    if (!this.domContainer) throw new Error(destroyedErrMsg);
    this.template = template;
    this.render();
  }

  render() {
    if (!this.domContainer) throw new Error(destroyedErrMsg);
    ReactDOM.render(
      <I18nContext.Provider value={this.getI18n()}>
        <TemplateDesignerComponent
          template={this.template}
          saveTemplate={this.saveTemplateCallback}
          size={this.size}
          onChangeTemplate={(template) => {
            this.template = template;
          }}
        />
      </I18nContext.Provider>,
      this.domContainer
    );
  }
}

export default TemplateDesigner;
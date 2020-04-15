import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JquerytWpDemoWebPart.module.scss';
import * as strings from 'JquerytWpDemoWebPartStrings';
import {SPComponentLoader} from '@microsoft/sp-loader';
import * as jQuery from "jquery";
import 'jqueryui';
import TechAccordionTemp from './TechAccordion';

export interface IJquerytWpDemoWebPartProps {
  description: string;
}

export default class JquerytWpDemoWebPart extends BaseClientSideWebPart <IJquerytWpDemoWebPartProps> {
  public constructor() {
        super();
        SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
      }
    
  public render(): void {
    this.domElement.innerHTML = TechAccordionTemp.templateHtml;
    const accordionOptions: JQueryUI.AccordionOptions = {
          animate: true,
          collapsible: false,
          icons: {
            header: 'ui-icon-circle-arrow-e',
            activeHeader: 'ui-icon-circle-arrow-s'
          }
        };
      jQuery('.accordion', this.domElement).accordion(accordionOptions);
      
  //   `
  //     <div class="${ styles.jquerytWpDemo }">
  //   <div class="${ styles.container }">
  //     <div class="${ styles.row }">
  //       <div class="${ styles.column }">
  //         <span class="${ styles.title }">Welcome to SharePoint!</span>
  // <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
  //   <p class="${ styles.description }">${escape(this.properties.description)}</p>
  //     <a href="https://aka.ms/spfx" class="${ styles.button }">
  //       <span class="${ styles.label }">Learn more</span>
  //         </a>
  //         </div>
  //         </div>
  //         </div>
  //         </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AppcustApplicationCustomizerStrings';
import styles from './AppcustApplicationCustomizer.module.scss';

const LOG_SOURCE: string = 'AppcustApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppcustApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Button: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppcustApplicationCustomizer
  extends BaseApplicationCustomizer<IAppcustApplicationCustomizerProperties> {
    private _topPlaceholder: PlaceholderContent | undefined;
    private _buttonPlaceholder: PlaceholderContent | undefined;

    
    
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolsers);
    this._renderPlaceHolsers();

    

    return Promise.resolve<void>();
  }

  private _onDispose(): void{
    console.log('Dispose was called');


  }
  private _renderPlaceHolsers(): void {
    console.log('Available placeholser: ',
    this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    if(!this._topPlaceholder){
      this._topPlaceholder =
      this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        {onDispose: this._onDispose});

      if(!this._topPlaceholder){
        console.error('the expected placeholder (top) was not foud.');
        return;
      }

      if(this.properties){
        let topString: string =this.properties.Top;

        if(!topString){
          topString ='(Top proprty was not defined.)';
        }

        if(this._topPlaceholder.domElement){
          
          this._topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.top} ">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}

            </div>
            

          </div>
          `;

          
        }
      }




    }

  } //
}

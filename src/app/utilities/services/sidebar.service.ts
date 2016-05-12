import { Injectable, Inject} from '@angular/core';
import { SidebarSection } from '../../dspace/models/sidebar-section.model.ts';
import { ObjectUtil } from "../../utilities/commons/object.util";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/**
 * A class for the sidebar service, to remove and add components to the sidebar.
 */

@Injectable()
export class SidebarService
{

    // We need to store objects of type 'sidebar-division'
    // These objects need a name, id, ..
    // The name can be their identifier
    // We need one generic component which knows how to render these models
    // We loop in the sidebar component over all components in the array contained in this class
    // we pass the data of these array entries to the generic component, in order to be rendered.

    // we need to make sure that the router links exist.

    /**
     * breaking away from the style guide here because we want some logic in the getter.
     * @type {Array}
     * @private
     */
    private _components : SidebarSection[] = [];


    sidebarSubject : Subject<any>;

    constructor()
    {
        this.sidebarSubject = new Subject<any>();
    }


    /**
     * Returns an ordered array of the visible components.
     * @returns {SidebarSection[]}
     */
    get components()
    {
        // first make sure that the ones without an index, appear last.
        let max = Math.max.apply(Math,this._components.filter(x => ObjectUtil.hasValue(x.index)).map(x => x.index))+1;
        this._components.forEach(component=>
        {
            if(ObjectUtil.hasNoValue(component.index))
            {
                component.index = max;
            }
        });
        var sortedVisibleComponents = this._components.filter(component => component.visible).sort(function(c1,c2) { return c1.index - c2.index;});
        return sortedVisibleComponents;
    }

    /**
     *
     * @param components
     */
    set components(components)
    {
        this.components = components
    }

    /**
     *
     * create new component or replace existing component based on the component's id.
     * this also has the advantage of setting a new array as the _components array
     * which we want for angular's change detection
     * @param component
     */
    addSection(component : SidebarSection)
    {
        let newComponentArray = this.components.filter(x => x.id != component.id);
        newComponentArray.push(component);
        this._components = newComponentArray;
        // generate subject event
        this.sidebarSubject.next(true);
    }

    // remove a component based on an ID
    removeComponent(id)
    {
        this._components = this._components.filter(component => component.id != id);
        this.sidebarSubject.next(true); // create an observable event.
    }
}


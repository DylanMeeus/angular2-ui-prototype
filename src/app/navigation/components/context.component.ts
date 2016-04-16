import {Component} from 'angular2/core';

/**
 * Context aware component for displaying information/functionality of
 * the current context. Can be either a community, collection, or an item.
 */
@Component({
    selector: 'context',
    inputs: ['context'],
    template: `
    			<div class="panel panel-default">
				  	<div class="panel-heading">
				    	<h3 class="panel-title">{{context.name}}</h3>
				  	</div>
				  	<div class="panel-body" *ngIf="context.type == 'dashboard'">
				    	{{context.type}}
				  	</div>
				  	<div class="panel-body" *ngIf="context.type == 'community'">
				    	{{context.type}}
				  	</div>
				  	<div class="panel-body" *ngIf="context.type == 'collection'">
				    	{{context.type}}
				  	</div>
				<!-- I have implemented this in the simple & full view.
				<div class="panel-body" *ngIf="context.type == 'item'">
                        <ul>
                            <li *ngFor="#bitstream of context.bitstreams">
                                <span>{{bitstream.name}}</span>
                            </li>
                        </ul>
				  	</div> -->
				</div>
    		  `
})
export class ContextComponent {

    /**
     * An input variable that is passed into the component [context].
     * Represents the current context.
     */
	context: any;

}
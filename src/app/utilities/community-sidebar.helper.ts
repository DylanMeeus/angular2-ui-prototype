import { Inject } from '@angular/core';
import { SidebarSection } from '../dspace/models/sidebar-section.model';
import { Community } from '../dspace/models/community.model';
import { SidebarService } from './services/sidebar.service';


/**
 * Class to populate the sidebar on community pages.
 */
export class CommunitySidebarHelper
{

    /**
     *
     */
    sections : Array<SidebarSection>;

    /**
     *
     * @param sidebarService
     */
    constructor(private sidebarService : SidebarService, private community : Community)
    {
        this.sidebarService = sidebarService;
        this.sections = [];
    }


    /**
     * The community sidebar
     * // They might all need an observable for the user authentication.
     */
    populateSidebar()
    {
        let homeChildSection =  SidebarSection.getBuilder()
            .name("sidebar.context-community.view")
            .route("Communities",{id : this.community.id})
            .build();

        let browseChildSection = SidebarSection.getBuilder()
            .name("sidebar.context-collection.edit")
            .route("CommunityEdit",{id: this.community.id})
            .build();

        let createCommunity = SidebarSection.getBuilder()
            .name("sidebar.context-community.create-community")
            .route("Home")
            .build();

        let createCollection = SidebarSection.getBuilder()
            .name("sidebar.context-community.create-collection")
            .route("Home")
            .build();

        let communitySection = SidebarSection.getBuilder()
            .name("sidebar.context-community.header")
            .id("context-collection")
            .addChildren([homeChildSection,browseChildSection,createCollection,createCommunity])
            .build();
        this.sidebarService.addSection(communitySection);
        this.sections.push(communitySection);
    }


    /**
     *
     */
    removeSections()
    {
        this.sections.forEach(section => this.sidebarService.removeSection(section));
    }
}
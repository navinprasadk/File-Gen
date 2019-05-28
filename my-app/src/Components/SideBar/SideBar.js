import React from 'react'
import { Header, Segment, Menu, Icon, Sidebar } from 'semantic-ui-react'
import ReusableAccordion from '../Accordion/ReusableAccordion';
import './SideBar.css';

const SidebarComponent = () => (
    <React.Fragment>
       <b className='SideBar_title'>Modules</b>
   

      <ReusableAccordion className='Accordion'/>
   
    </React.Fragment>
   
 
)

export default SidebarComponent
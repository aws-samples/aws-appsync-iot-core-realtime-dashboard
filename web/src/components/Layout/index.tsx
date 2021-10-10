import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { AppLayout, SideNavigation} from '@awsui/components-react'
import AppBar from '../AppBar'

const Layout: React.FC = (props) => {

    const [activeHref, setActiveHref] = useState("/");
    const history = useHistory();
  
      return (
          <div>
          <AppBar/>
          <AppLayout 
                toolsHide={true}
                navigationHide={true}
                headerSelector='#b #h'
                navigation={
                  <SideNavigation
                    activeHref={activeHref}
                    header={{ href: "/", text: "Bay Health" }}
                    onFollow={event => {
                      if (!event.detail.external) {
                        event.preventDefault();
                        setActiveHref(event.detail.href);
                        history.push(event.detail.href);
                      }
                    }}
                    items={[
                      { type: 'link', text: 'Sensor Map', href: '/' }
                    ]}
                />
                }
                content={props.children}
          />
          </div>
      );
  }
  
  export default Layout
import React from 'react';
import { Container} from 'reactstrap';

class AppNavbar extends React.Component {

    render() {
      return (
        <div>
            <Container>
                <br/><br/><br/>
                <h3>Sorry You're Not Authorized to access this!</h3>
                <br/><br/><br/>
            </Container>
        </div>
      );
    }
  }
  
  export default AppNavbar;
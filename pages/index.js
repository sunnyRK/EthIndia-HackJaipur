import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import { withRouter } from 'next/router';
import Link from 'next/link';

class Index extends Component {
    
    render() {
        return (
          <Layout>
            <ToastContainer/>
            <Container>
              <Link href="/dashboard"><a>Login</a></Link>  
            </Container>
          </Layout>
        );
    }
}

export default Index;

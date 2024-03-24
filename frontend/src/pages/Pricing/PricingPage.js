import React from 'react';
import './pricing.css';
import MenuBar from '../../components/MenuBar';
import Sidebar from '../../components/SideBar';
import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';

function PricingPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuBar />
      <Sidebar />
      <Grid container alignItems='center' justifyConcent='center'>
        <div className="container">
          <h1 className="text-center mt-5">Choose Your Plan</h1>
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Monthly Subscription</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla justo eget aliquet.</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Access to all features</li>
                    <li className="list-group-item">24/7 customer support</li>
                    <li className="list-group-item">Cancel anytime</li>
                  </ul>
                  <button className="btn btn-primary mt-3">Choose Monthly Plan</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Yearly Subscription</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla justo eget aliquet.</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Access to all features</li>
                    <li className="list-group-item">24/7 customer support</li>
                    <li className="list-group-item">Save 20% with yearly billing</li>
                  </ul>
                  <button className="btn btn-primary mt-3">Choose Yearly Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default PricingPage;

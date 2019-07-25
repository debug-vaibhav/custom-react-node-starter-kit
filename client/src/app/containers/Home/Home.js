import React from "react";
import { connect } from "react-redux";
import { ToggleShow } from "../../redux/actions/homeActions";
import styles from "./home.scss";

class Home extends React.Component {
  render() {
    return <div>Home container</div>;
  }
}

const mapStateToProps = state => {
  return {
    homeBlogReducer1: state.homeBlogReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

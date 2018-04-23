import React from 'react';

import classes from './Landing.css'
import ReactAux from '../../hoc/ReactAux/ReactAux'
import bgImage from '../../assets/images/bg.jpg'
import AnimatedNumber from 'react-animated-number';
import axios from "axios/index";
import serverConfig from "../../serverConfig";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import purple from "material-ui/colors/purple";
import {CircularProgress} from 'material-ui/Progress';

class Landing extends React.Component {

    componentDidMount() {
        let onSetDatabaseInfo = this.props.onSetDatabaseInfo;
        axios.get(serverConfig.backendUrl + 'landing')
            .then(function (response) {
                console.log(response);
                onSetDatabaseInfo(response.data.databaseInfo);
            })
    }

    render() {
        return (
            <ReactAux>
                <div><img className={classes.bg} src={bgImage} alt="bgImage"/></div>
                <div className={classes.root}>
                    <h1>BibGallery</h1>
                    <h3>Search for publication and authors.</h3>
                    {console.log(this.props.databaseInfo)}
                    {this.props.databaseInfo === undefined ?
                        (<div key={0}><CircularProgress size={100} thickness={2}
                                                        style={{color: purple[500]}}/></div>) :
                        (<div><h3><AnimatedNumber value={this.props.databaseInfo.PUBLICATION_COUNT +
                        this.props.databaseInfo.ARTICLE_COUNT +
                        this.props.databaseInfo.INCOLLECTION_COUNT +
                        this.props.databaseInfo.INPROCEEDING_COUNT +
                        this.props.databaseInfo.BOOK_COUNT +
                        this.props.databaseInfo.PROCEEDING_COUNT +
                        this.props.databaseInfo.CITE_COUNT +
                        this.props.databaseInfo.PUBLISH_COUNT +
                        this.props.databaseInfo.PERSON_COUNT +
                        this.props.databaseInfo.NAME_COUNT}
                                                  style={{
                                                      transition: '0.8s ease-out',
                                                      fontSize: 24,
                                                      transitionProperty:
                                                          'background-color, color, opacity'
                                                  }}
                                                  frameStyle={perc => (
                                                      perc === 100 ? {} : {backgroundColor: 'gray'}
                                                  )}
                                                  duration={500}
                                                  formatValue={n => Math.round(n).toString() + ' Records'}/></h3>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.PUBLICATION_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Publication'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.ARTICLE_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Article'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.INCOLLECTION_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Incollection'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.INPROCEEDING_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Inproceeding'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.BOOK_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Book'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.PROCEEDING_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Proceeding'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.CITE_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Cite'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.PUBLISH_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Publish'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.PERSON_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Person'}/>
                            </div>
                            <div>
                                <AnimatedNumber value={this.props.databaseInfo.NAME_COUNT}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 18,
                                                    transitionProperty:
                                                        'background-color, color, opacity'
                                                }}
                                                frameStyle={perc => (
                                                    perc === 100 ? {} : {backgroundColor: 'gray'}
                                                )}
                                                duration={500}
                                                formatValue={n => Math.round(n).toString() + ' in Name'}/>
                            </div>
                        </div>)}
                    <div>

                    </div>

                </div>
            </ReactAux>
        )
    }
}

const mapStateToProps = state => {
    return {
        databaseInfo: state.databaseInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetDatabaseInfo: (databaseInfo) => dispatch({type: actions.SETDATABASEINFO, databaseInfo: databaseInfo}),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Landing)
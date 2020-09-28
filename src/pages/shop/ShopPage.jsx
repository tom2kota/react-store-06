import React, {Component} from "react";
import {Route} from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {updateCollections} from "../../redux/shop/shopActions";
import './ShopPage.scss';
import {WithSpinner} from "../../components/with-spinner/withSpinner";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component {
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections')
        const {updateCollections} = this.props

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap);
                this.setState({loading: false})
            }
        )
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       render={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}
                />
                <Route path={`${match.path}/:collectionId`}
                       render={props => <CollectionPageWithSpinner isLoading={loading} {...props}/>}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
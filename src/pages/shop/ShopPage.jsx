import React, {Component} from "react";
import {Route} from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {updateCollections} from "../../redux/shop/shopActions";
import './ShopPage.scss';

class ShopPage extends Component {

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections')
        const {updateCollections} = this.props

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap)
            }
        )
    }

    render() {
        const {match} = this.props
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
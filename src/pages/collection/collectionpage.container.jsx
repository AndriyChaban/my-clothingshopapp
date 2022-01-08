import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collectionpage.component";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";

const mapStateToProps = createStructuredSelector(
    {isLoading: (state)=>!selectIsCollectionsLoaded(state)}
)

const CollectionPageContainer = compose(
    connect(mapStateToProps), WithSpinner)(
        CollectionPage
)

export default CollectionPageContainer;
import Path from 'path-parser';
import { NavigationActions } from 'react-navigation';

const paths = [
    {
        routeName: 'Invoice',
        path: new Path('/lowco/Invoice'),
    },
    {
        routeName: 'Account',
        path: new Path('/lowco/Account'),
    },
    {
        routeName: 'Plus',
        path: new Path('/lowco/Plus'),
    },
    {
        routeName: 'Consumption',
        path: new Path('/lowco/Consumption'),
    }
];

const findPath = url => paths.find(path => path.path.test(url));

export default (url, store) => {

    console.log('here');
    const pathObject = findPath(url);

    if (!pathObject) return;

    const navigateAction = NavigationActions.navigate({
        routeName: pathObject.routeName,
        params: pathObject.path.test(url),
    });

    store.dispatch(navigateAction);
};
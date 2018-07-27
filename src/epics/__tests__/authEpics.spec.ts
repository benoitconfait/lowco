import { ActionsObservable } from 'redux-observable';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import AuthReducer, { Token } from '../../reducers/AuthReducer';
import * as authEpics from '../AuthEpics';
import { clearError } from '../../actions/errorActions';
import { ErrorActionTypes } from '../../actionTypes/errorActionTypes';
import { AuthActionTypes } from '../../actionTypes/authActionTypes';
import {
    fetchAccessToken,
    fetchAccessTokenFulFilled,
    fetchAccessTokenError,
    refreshTokenFulFilled,
    refreshToken,
    refreshTokenError
} from '../../actions/AuthAction';

import { post } from '../ajaxObservable';

const expectedToken: Token = {
    refreshToken: 'fake_refresh_token',
    accessToken: 'fake_access_token',
    expiresIn: 3000,
    tokenType: 'Bearer'
};

describe('epics/authEpics', () => {

    //#region access token epics
    it('access token flow: dispatches two result actions when token is returned', (done) => {

        const mockedResponse = {
            response: expectedToken
        };

        const ajax = {
            post: (url: string, body: object) => Observable.of(mockedResponse)
        };

        const authCode = 'fake_auth_code';

        const action$ = ActionsObservable.of(fetchAccessToken(authCode));

        authEpics.fetchAccessTokenEpic(action$, {}, { ajax })
            .toArray()
            .subscribe(receivedActions => {

                const dispachedClearError = receivedActions[0];
                const dispachedFetchAccessTokenFulFilled = receivedActions[1];
                const receivedToken = dispachedFetchAccessTokenFulFilled.payload;

                expect(receivedActions.length).toBe(2);
                expect(dispachedClearError.type).toBe(ErrorActionTypes.CLEAR_ERROR);
                expect(dispachedFetchAccessTokenFulFilled.type).toBe(AuthActionTypes.FETCH_ACCESS_TOKEN_FULFILLED);
                expect(receivedToken.accessToken).toBe(expectedToken.accessToken);
                expect(receivedToken.refreshToken).toBe(expectedToken.refreshToken);
                expect(receivedToken.expiresIn).toBe(expectedToken.expiresIn);
                expect(receivedToken.tokenType).toBe(expectedToken.tokenType);
                done();
            });
    });

    it('access token flow: dispatches error fetchAccessTokenError action when ajax fails ', (done) => {

        const errorMessage = 'Failed Ajax Call';
        const ajax = {
            post: (url: string, body: object) => Observable.throw({ error: errorMessage })
        };

        const authCode = 'fake_auth_code';

        const action$ = ActionsObservable.of(fetchAccessToken(authCode));

        authEpics.fetchAccessTokenEpic(action$, {}, { ajax })
            .toArray()
            .subscribe(receivedActions => {
                const dispachedclearError = receivedActions[0];

                expect(receivedActions.length).toBe(1);
                expect(dispachedclearError.type).toBe(AuthActionTypes.FETCH_ACCESS_TOKEN_ERROR);
                expect(dispachedclearError.payload.error).toBe(errorMessage);
                done();
            });
    });
    //#endregion

    //#region refresh token epics
    it('refresh token flow: dispatches two result actions when token is returned', (done) => {

        const mockedResponse = {
            response: expectedToken
        };

        const ajax = {
            post: (url: string, body: object) => Observable.of(mockedResponse)
        };

        const fakeRefreshToken = 'fake_refresh_token';

        const action$ = ActionsObservable.of(refreshToken(fakeRefreshToken));

        authEpics.refreshTokenEpic(action$, {}, { ajax })
            .toArray()
            .subscribe(receivedActions => {

                const dispachedClearError = receivedActions[0];
                const dispachedRefreshTokenFulFilled = receivedActions[1];
                const newToken = dispachedRefreshTokenFulFilled.payload;

                expect(receivedActions.length).toBe(2);
                expect(dispachedClearError.type).toBe(ErrorActionTypes.CLEAR_ERROR);
                expect(dispachedRefreshTokenFulFilled.type).toBe(AuthActionTypes.REFRESH_TOKEN_FULFILLED);
                expect(newToken.accessToken).toBe(expectedToken.accessToken);
                expect(newToken.refreshToken).toBe(expectedToken.refreshToken);
                expect(newToken.expiresIn).toBe(expectedToken.expiresIn);
                expect(newToken.tokenType).toBe(expectedToken.tokenType);
                done();
            });
    });

    it('refresh token flow: dispatches error refreshTokenError action when ajax fails ', (done) => {

        const errorMessage = 'Failed Ajax Call invalid refresh_token';
        const ajax = {
            post: (url: string, body: object) => Observable.throw({ error: errorMessage })
        };

        const invalidRefreshToken = 'invalid_or_expired_refresh_token';

        const action$ = ActionsObservable.of(refreshToken(invalidRefreshToken));

        authEpics.refreshTokenEpic(action$, {}, { ajax })
            .toArray()
            .subscribe(receivedActions => {
                const dispachedclearError = receivedActions[0];

                expect(receivedActions.length).toBe(1);
                expect(dispachedclearError.type).toBe(AuthActionTypes.REFRESH_TOKEN_ERROR);
                expect(dispachedclearError.payload.error).toBe(errorMessage);
                done();
            });
    });
    //#endregion
});
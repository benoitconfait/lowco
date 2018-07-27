import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { COLOR_GRAY_20 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';
import ErrorScreen from '../screens/error';
import WarningBanner from '../common/WarningBanner';

interface Props {
  noData: boolean;
  loading: boolean;
  refreshing: boolean;
  onRefresh: any;
  offline: boolean;
  error?: any;
  noDataNoErrorText?: string;
  children: any;
}

function MyScrollView({ noData, loading, refreshing, onRefresh, offline, error, noDataNoErrorText, children }: Props) {

  const errorText = !error && noData && noDataNoErrorText ? noDataNoErrorText : 'Veuillez réessayer dans quelques instants';

  return (
    <View style={styles.body}>
      {error || offline ? <WarningBanner offline={offline} error={error} /> : null}
      {
        (loading) ?
          (
            <ActivityIndicator
              animating
              style={[{ height: scale(80) }]}
              size="large"
            />
          ) : null
      }
      <ScrollView contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={[styles.scrollViewContent, noData ? styles.scrollViewCenteredContent : null]}>
          {noData ?
            (!loading ? <ErrorScreen errorType={error ? 'WARNING' : 'NODATA'} errorText={errorText} /> : null) : children}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLOR_GRAY_20
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  scrollViewContent: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: scale(40),
    justifyContent: 'flex-start'
  },
  scrollViewCenteredContent: {

  }
});

export default MyScrollView;

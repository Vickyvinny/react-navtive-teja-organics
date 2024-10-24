import React, {Component} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {fonts} from '../constants/fonts';
import {termsAndConditions} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {colors} from '../utils/Colors';

interface IState {}

interface IProps {
  navigation: any;
  termsAndConditions: () => void;
  termsAndConditionsData: {
    terms_and_conditions: {
      id: number;
      terms_and_condition: string;
      created_at: string;
      updated_at: string;
    }[];
  };
  loading: boolean;
  error: string | null;
}

class TermsAndConditions extends Component<IProps, IState> {
  componentDidMount(): void {
    this.props.termsAndConditions();
  }

  render() {
    const {terms_and_conditions} = this.props.termsAndConditionsData;
    const {loading, error} = this.props;

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.lightGreen} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.termsContainer}
          showsVerticalScrollIndicator={false}>
          {terms_and_conditions ? (
            terms_and_conditions.map(item => (
              <View key={item.id} style={styles.termItem}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="arrow-forward-ios" size={15} color={colors.black}/>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.termText}>
                    {item.terms_and_condition}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text>Data Not Found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  termsAndConditionsData: state.Auth.termsAndCondition,
  loading: state.Auth.loading,
  error: state.Auth.errorMassage,
});

const mapDispatchProp = (dispatch: AppDispatch) => ({
  termsAndConditions: () => {
    dispatch(termsAndConditions());
  },
});

export default connect(mapStateToProps, mapDispatchProp)(TermsAndConditions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sinupBgColor,
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorText: {
    fontSize: 16,
    color: colors.red,
  },
  termsContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: responsiveScreenWidth(90),
  },
  termItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',

  },
  iconContainer: {
    width: responsiveScreenWidth(4),
    marginTop:responsiveScreenHeight(0.6)
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  termText: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: fonts.medium,
    color: colors.iconColor,
  },
});

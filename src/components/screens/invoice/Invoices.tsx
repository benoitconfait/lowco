import React from 'react';
import { View, Platform, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Card, CardHeader } from '../../common/card';
import SectionHeader from '../../common/SectionHeader';
import Section from '../../common/Section';
import TwoLines from '../../common/TwoLines';
import ProgressBar from '../../common/ProgressBar';
import { CardSVG, SparkleFourSVG, SparkleSixSVG } from '../../common/images';
import translate from '../../../lang/translate';
import { COLOR_WHITE, COLOR_GRAY_20, COLOR_GRAY_100, COLOR_PRIMARY } from '../../../styles/commonStyles';
import { scale } from '../../../helpers/scaleHelper';
import moment from 'moment';
import numeral from '../../../helpers/numberFormatter';
import Icon = VOO.Mobile.App.Enums.Icon;
import IconSize = VOO.Mobile.App.Enums.IconSize;
import PaymentStatusType = Lowco.Domain.Views.Billing.PaymentStatusType;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import { buildHeader } from '../../../helpers/authHelper';

function Invoices({ style, invoices, token, downloadInvoice }) {
    if (invoices && invoices.length > 0) {

        const getColumnType = (paymentStatus: PaymentStatusType) => {
            switch (paymentStatus) {
                case PaymentStatusType.Cancelled:
                case PaymentStatusType.Paid:
                    return LineColumnType.PositiveSpaced;
                case PaymentStatusType.ToBePaid:
                case PaymentStatusType.PartiallyPaid:
                case PaymentStatusType.PartiallyUnPaid:
                    return LineColumnType.WarningSpaced;
                case PaymentStatusType.UnPaid:
                case PaymentStatusType.Clearance_Plan:
                    return LineColumnType.ErrorSpaced;
            }

            return LineColumnType.Info;
        };

        return (
            <View style={style}>
                {invoices.map((invoice, index) =>
                    <TouchableHighlight underlayColor='rgba(212,0,122,0.1)' key={`invoice-${index}`} onPress={() => downloadInvoice(invoice.documentReference)}>
                        <Section style={styles.invoiceDetails}>
                            <TwoLines
                                icon={Icon.DOWNLOAD_INVOICE}
                                iconSize={IconSize.BIG}
                                line1Column1Text={`${invoice.product === 'Television' ? 'TV' : invoice.product} - Facture du ${moment(invoice.invoiceDate).format('DD/MM')}`}
                                line1Column1Type={LineColumnType.Default}
                                line1Column2Text={`${numeral(invoice.amout).format()}`}
                                line1Column2Type={LineColumnType.Default}
                                line1Column2Text2='€'
                                line1Column2Text2Type={LineColumnType.Header}
                                line2Column1Text={`ÉCHÉANCE: ${moment(invoice.paymentDueDate).format('DD/MM/YYYY')}`}
                                line2Column1Type={LineColumnType.InfoSpaced}
                                line2Column2Text={translate(invoice.paymentStatus.toUpperCase())}
                                line2Column2Type={getColumnType(invoice.paymentStatus)} />
                        </Section>
                    </TouchableHighlight>
                )}
            </View >
        );
    }
    return null;
}

const styles = StyleSheet.create({
    invoiceDetails: {
        paddingLeft: scale(20),
        paddingRight: scale(23)
    }
});


export default Invoices;

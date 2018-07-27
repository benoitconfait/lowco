import RNFetchBlob from 'react-native-fetch-blob';
import { Platform } from 'react-native';

export const download = (url: string) => {

    const date = new Date();
    const { config, fs } = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;

    let options = {
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: DownloadDir + '/Facture_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf',
            description: 'Facture'
        }
    };

    config(options).fetch('GET', url).then((res) => {
        const path = res.path();
        if (Platform.OS === 'ios') {
            RNFetchBlob.ios.previewDocument(path);
        }
        else {
            RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
        }
    });
};

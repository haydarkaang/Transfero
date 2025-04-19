
export function getString(language: Langugage, key: string | undefined): string {
    if (key === undefined) {
        throw new Error("Key is undefined!");
    }
    for (let repoIndex = 0; repoIndex < repo.length; repoIndex++) {
        const item = repo[repoIndex];
        if (item.key == key) {
            for (let resourceIndex = 0; resourceIndex < item.resources.length; resourceIndex++) {
                const resource = item.resources[resourceIndex];
                if (resource.language == language) {
                    return resource.value;
                }
            }
            throw new Error("Unimplemented langugage requested for string: " + language);
        }
    }
    throw new Error("Unimplemented key requested for string: " + key);
}

export type Langugage = 'tr' | 'en';

interface SubItem {
    language: Langugage,
    value: string
}

interface Item {
    key: string,
    resources: SubItem[]
}

const repo: Item[] = [
    {
        key: "ask-permission",
        resources: [
            {
                language: "en",
                value: "Please be sure that permissions have been given for usage"
            },
            {
                language: "tr",
                value: "Lütfen kullanım için izinlerin verildiğinden emin olun"
            }
        ]
    },
    {
        key: "backhandler-alert-message",
        resources: [
            {
                language: "en",
                value: "Do you want to cancel the currently running process?"
            },
            {
                language: "tr",
                value: "Şuanda yürütülen işlemi iptal etmek istiyor musunuz?"
            }
        ]
    },
    {
        key: "backhandler-alert-title",
        resources: [
            {
                language: "en",
                value: "Abort The Process"
            },
            {
                language: "tr",
                value: "İşlemi İptal Et"
            }
        ]
    },
    {
        key: "connection-pairing",
        resources: [
            {
                language: "en",
                value: "Trying to connect"
            },
            {
                language: "tr",
                value: "Bağlantı deneniyor"
            }
        ]
    },
    {
        key: "file-selection-client-screen-have-selected-files",
        resources: [
            {
                language: "en",
                value: " file(s) ready to transfer."
            },
            {
                language: "tr",
                value: " dosya(lar) aktarım için hazır."
            }
        ]
    },
    {
        key: "file-selection-client-screen-process-selected-files",
        resources: [
            {
                language: "en",
                value: "Please wait while retrieving file properties from the device... The duration may vary depending on the number and size of the selected files."
            },
            {
                language: "tr",
                value: "Cihazdan dosya özellikleri alınırken bekleyin... Seçilen dosya sayısı ve boyutuna göre süre değişebilir"
            }
        ]
    },
    {
        key: "general-error",
        resources: [
            {
                language: "en",
                value: "An unexpected error occured"
            },
            {
                language: "tr",
                value: "Beklenmedik bir hata oluştu"
            }
        ]
    },
    {
        key: "general-error-code",
        resources: [
            {
                language: "en",
                value: "Error Code"
            },
            {
                language: "tr",
                value: "Hata Kodu"
            }
        ]
    },
    {
        key: "general-no",
        resources: [
            {
                language: "en",
                value: "No"
            },
            {
                language: "tr",
                value: "Hayır"
            }
        ]
    },
    {
        key: "general-yes",
        resources: [
            {
                language: "en",
                value: "Yes"
            },
            {
                language: "tr",
                value: "Evet"
            }
        ]
    },
    {
        key: "pairing-error-alert-message",
        resources: [
            {
                language: "en",
                value: "Unable to connect to another device to start the transfer"
            },
            {
                language: "tr",
                value: "Aktarımı başlatmak için başka bir cihaza bağlanılamıyor"
            }
        ]
    },
    {
        key: "pairing-error-alert-title",
        resources: [
            {
                language: "en",
                value: "Pairing Failed!"
            },
            {
                language: "tr",
                value: "Eşleştirme Başarısız!"
            }
        ]
    },
    {
        key: "permission-screen-desc-camera",
        resources: [
            {
                language: "en",
                value: "This permission allows the application to use the camera hardware on your device to take photos or record videos"
            },
            {
                language: "tr",
                value: "Bu izin, uygulamanın cihazınızdaki kamera donanımını kullanarak fotoğraf çekmesine veya video kaydetmesine olanak tanır"
            }
        ]
    },
    {
        key: "permission-screen-desc-media-library",
        resources: [
            {
                language: "en",
                value: "This app needs access to your media library to browse and transfer your photos, videos, and music. Granting permission allows seamless access to your saved media for a better experience"
            },
            {
                language: "tr",
                value: "Bu uygulama, fotoğraflarınızı, videolarınızı ve müziklerinizi görüntüleyip aktarmak için medya kütüphanenize erişim izni gerektirir. İzni vererek kaydedilmiş medyanıza sorunsuz erişim sağlayabilirsiniz"
            }
        ]
    },
    {
        key: "permission-screen-desc-photo-library",
        resources: [
            {
                language: "en",
                value: "This app requires access to your photo library to view and transfer your photos. Granting permission allows seamless access to your saved photos"
            },
            {
                language: "tr",
                value: "Bu uygulama, fotoğraflarınızı görüntülemek ve aktarmak için fotoğraf kütüphanenize erişim izni gerektirir. İzni vererek kaydedilmiş fotoğraflarınıza sorunsuz erişim sağlayabilirsiniz"
            }
        ]
    },
    {
        key: "permission-screen-desc-photo-library-add",
        resources: [
            {
                language: "en",
                value: "This app requires permission to add new photos to your photo library. It will not access or modify your existing photos. Granting permission allows the app to save images without viewing your photo collection"
            },
            {
                language: "tr",
                value: "Bu uygulama, fotoğraf kütüphanenize yeni fotoğraflar eklemek için izin gerektirir. Mevcut fotoğraflarınıza erişmez veya bunları değiştirmez. İzni vererek uygulamanın fotoğrafları kaydetmesine izin verebilirsiniz"
            }
        ]
    },
    {
        key: "permission-screen-desc-read-external-storage",
        resources: [
            {
                language: "en",
                value: "This permission allows the application to access the external storage on the device. The user must grant this permission to enable the application to access photos, videos, audio files, and other media content"
            },
            {
                language: "tr",
                value: "Bu izin, uygulamanın cihazdaki harici depolama alanına erişmesine olanak tanır. Kullanıcı, uygulamanın fotoğraflara, videolara, ses dosyalarına ve diğer medya içeriklerine erişmesini sağlamak için bu izni vermelidir"
            }
        ]
    },
    {
        key: "permission-screen-desc-read-media-audio",
        resources: [
            {
                language: "en",
                value: "This permission allows the application to access audio files on your device. You need to grant this permission for the application to view your audio files"
            },
            {
                language: "tr",
                value: "Bu izin, uygulamanın cihazınızdaki ses dosyalarına erişmesini sağlar. Uygulamanın ses dosyalarını görüntüleyebilmesi için bu izni vermeniz gerekir"
            }
        ]
    },
    {
        key: "permission-screen-desc-read-media-images",
        resources: [
            {
                language: "en",
                value: "This permission allows the application to access image files on your device. You need to grant this permission for the application to view your photos"
            },
            {
                language: "tr",
                value: "Bu izin, uygulamanın cihazınızdaki resim dosyalarına erişmesini sağlar. Uygulamanın fotoğraflarınızı görüntüleyebilmesi için bu izni vermeniz gerekir."
            }
        ]
    },
    {
        key: "permission-screen-desc-read-media-video",
        resources: [
            {
                language: "en",
                value: "This permission allows the application to access video files on your device. You need to grant this permission for the application to view your videos"
            },
            {
                language: "tr",
                value: "Bu izin, uygulamanın cihazınızdaki video dosyalarına erişmesini sağlar. Uygulamanın videolarınızı görüntüleyebilmesi için bu izni vermeniz gerekir"
            }
        ]
    },
    {
        key: "permission-screen-desc-write-external-storage",
        resources: [
            {
                language: "en",
                value: "This permission allows the application to save and modify files on the external storage of the device. The user must grant this permission for the application to store photos, videos, and other files"
            },
            {
                language: "tr",
                value: "Bu izin, uygulamanın cihazdaki harici depolama alanına dosya kaydetmesine ve düzenlemesine olanak tanır. Kullanıcı, uygulamanın fotoğrafları, videoları ve diğer dosyaları depolayabilmesi için bu izni vermelidir"
            }
        ]
    },
    {
        key: "permission-screen-title-camera",
        resources: [
            {
                language: "en",
                value: "Access Device Camera"
            },
            {
                language: "tr",
                value: "Cihaz Kamerasına Erişim"
            }
        ]
    },
    {
        key: "permission-screen-title-media-library",
        resources: [
            {
                language: "en",
                value: "Access Media Library"
            },
            {
                language: "tr",
                value: "Medya Kütüphanesine Erişim"
            }
        ]
    },
    {
        key: "permission-screen-title-photo-library",
        resources: [
            {
                language: "en",
                value: "Access Photo Library"
            },
            {
                language: "tr",
                value: "Fotoğraf Kütüphanesine Erişim"
            }
        ]
    },
    {
        key: "permission-screen-title-photo-library-add",
        resources: [
            {
                language: "en",
                value: "Add Photos to Library"
            },
            {
                language: "tr",
                value: "Fotoğraf Kütüphanesine Fotoğraf Ekleme"
            }
        ]
    },
    {
        key: "permission-screen-title-read-external-storage",
        resources: [
            {
                language: "en",
                value: "Reading External Storage"
            },
            {
                language: "tr",
                value: "Harici Depolama Alanından Okuma"
            }
        ]
    },
    {
        key: "permission-screen-title-read-media-audio",
        resources: [
            {
                language: "en",
                value: "Access Audio"
            },
            {
                language: "tr",
                value: "Ses Dosyalarına Erişim"
            }
        ]
    },
    {
        key: "permission-screen-title-read-media-images",
        resources: [
            {
                language: "en",
                value: "Access Images"
            },
            {
                language: "tr",
                value: "Resimlere Erişim"
            }
        ]
    },
    {
        key: "permission-screen-title-read-media-video",
        resources: [
            {
                language: "en",
                value: "Access Videos"
            },
            {
                language: "tr",
                value: "Video Erişimi"
            }
        ]
    },
    {
        key: "permission-screen-title-write-external-storage",
        resources: [
            {
                language: "en",
                value: "Writing External Storage"
            },
            {
                language: "tr",
                value: "Harici Depolama Alanına Yazma"
            }
        ]
    },
    {
        key: "qr-reader-camera-preparing",
        resources: [
            {
                language: "en",
                value: "Searching available camera to scan QR code..."
            },
            {
                language: "tr",
                value: "QR kod taramak için uygun kamera aranıyor..."
            }
        ]
    },
    {
        key: "qr-reader-desc",
        resources: [
            {
                language: "en",
                value: "Tap the QR code you want to scan to adjust the focus"
            },
            {
                language: "tr",
                value: "Taramak istediğiniz QR koduna dokunarak odak ayarını yapın"
            }
        ]
    },
    {
        key: "qr-reader-error",
        resources: [
            {
                language: "en",
                value: "The application is unable to access the device camera. Check out camera permission."
            },
            {
                language: "tr",
                value: "Uygulama cihaz kamerasına ulaşamıyor. Kamera iznini kontrol edin"
            }
        ]
    },
    {
        key: "qr-reader-scanned-data-preparing",
        resources: [
            {
                language: "en",
                value: "The QR code scanned successfully. Preparing data to use..."
            },
            {
                language: "tr",
                value: "QR kod başarılı sekilde tarandı. Veri kullanıma hazırlanıyor..."
            }
        ]
    },
    {
        key: "receiver-file-selection",
        resources: [
            {
                language: "en",
                value: "Waiting other device for file selection to start transfer..."
            },
            {
                language: "tr",
                value: "Aktarımı başlatmak için diğer cihazın dosya seçimi bekleniyor..."
            }
        ]
    },
    {
        key: "receiver-screen-receiver-device-title",
        resources: [
            {
                language: "en",
                value: "File Receiver Device"
            },
            {
                language: "tr",
                value: "Dosya Alıcı Cihaz"
            }
        ]
    },
    {
        key: "receiver-screen-transmitter-device-title",
        resources: [
            {
                language: "en",
                value: "File Sending Device"
            },
            {
                language: "tr",
                value: "Dosya Gönderen Cihaz"
            }
        ]
    },
    {
        key: "rejected-permissions-list-title",
        resources: [
            {
                language: "en",
                value: "The denied permissions are shown below. You can tap on them to go to settings and grant permission"
            },
            {
                language: "tr",
                value: "Aşağıda reddedilen izinler gösteriliyor. Üstlerine dokunarak ayarlara gidip, izin verebilirsiniz"
            }
        ]
    },
    {
        key: "selection-information-screen-audio-file",
        resources: [
            {
                language: "en",
                value: "Audio Files"
            },
            {
                language: "tr",
                value: "Ses Dosyaları"
            }
        ]
    },
    {
        key: "selection-information-screen-card-text",
        resources: [
            {
                language: "en",
                value: "Please use the folder icon below to select files"
            },
            {
                language: "tr",
                value: "Lütfen aşağıdaki klasör simgesini kullanarak dosyaları seçin."
            }
        ]
    },
    {
        key: "selection-information-screen-card-title",
        resources: [
            {
                language: "en",
                value: "No Selection"
            },
            {
                language: "tr",
                value: "Seçim Yok"
            }
        ]
    },
    {
        key: "selection-information-screen-file-count",
        resources: [
            {
                language: "en",
                value: "File(s)"
            },
            {
                language: "tr",
                value: "Dosya(lar)"
            }
        ]
    },
    {
        key: "selection-information-screen-image-file",
        resources: [
            {
                language: "en",
                value: "Image Files"
            },
            {
                language: "tr",
                value: "Resim Dosyaları"
            }
        ]
    },
    {
        key: "selection-information-screen-other-file",
        resources: [
            {
                language: "en",
                value: "Other Files"
            },
            {
                language: "tr",
                value: "Diğer Dosyalar"
            }
        ]
    },
    {
        key: "selection-information-screen-video-file",
        resources: [
            {
                language: "en",
                value: "Video Files"
            },
            {
                language: "tr",
                value: "Video Dosyaları"
            }
        ]
    },
    {
        key: "transfer-screen-completed-info",
        resources: [
            {
                language: "en",
                value: "Transfer completed!"
            },
            {
                language: "tr",
                value: "Aktarım tamamlandı"
            }
        ]
    },
    {
        key: "transfer-screen-percentage",
        resources: [
            {
                language: "en",
                value: "Transfer progress"
            },
            {
                language: "tr",
                value: "Aktarım ilerleyişi"
            }
        ]
    },
    {
        key: "transfer-screen-start-info",
        resources: [
            {
                language: "en",
                value: "Getting files ready for transfer"
            },
            {
                language: "tr",
                value: "Aktarım için dosyalar hazırlanınyor"
            }
        ]
    },
    {
        key: "transfer-screen-transfer-error",
        resources: [
            {
                language: "en",
                value: "Error occured during transfer"
            },
            {
                language: "tr",
                value: "Aktarım esnasında hata oluştu"
            }
        ]
    },
    {
        key: "transfer-screen-transfer-in-progress",
        resources: [
            {
                language: "en",
                value: "The file transfer process has started. Please do not interfere with your phone until the process is complete. You will be informed about the progress of the process."
            },
            {
                language: "tr",
                value: "Dosya aktarım işlemi başladı. İşlem bitene kadar telefonunuza müdahale etmeyiniz. İşlemin ilerleyişi hakkında bilgilendiriliyor olacaksınız."
            }
        ]
    },
    {
        key: "transmitter-file-selection",
        resources: [
            {
                language: "en",
                value: "Make your selections to start transfer"
            },
            {
                language: "tr",
                value: "Aktarımı başlatmak için seçimlerinizi yapın"
            }
        ]
    },
    {
        key: "transmitter-screen-add-files",
        resources: [
            {
                language: "en",
                value: "Select Files"
            },
            {
                language: "tr",
                value: "Dosyaları Seç"
            }
        ]
    },
    {
        key: "transmitter-screen-clear-item-abort",
        resources: [
            {
                language: "en",
                value: "No!"
            },
            {
                language: "tr",
                value: "Hayır!"
            }
        ]
    },
    {
        key: "transmitter-screen-clear-item-message",
        resources: [
            {
                language: "en",
                value: "Confirm if you would like to clear your selections"
            },
            {
                language: "tr",
                value: "Seçimlerinizi temizlemek istiyorsanız onaylayın"
            }
        ]
    },
    {
        key: "transmitter-screen-clear-item-ok",
        resources: [
            {
                language: "en",
                value: "Yes, Clear"
            },
            {
                language: "tr",
                value: "Evet, Temizle"
            }
        ]
    },
    {
        key: "transmitter-screen-clear-item-title",
        resources: [
            {
                language: "en",
                value: "Are you sure?"
            },
            {
                language: "tr",
                value: "Emin misin?"
            }
        ]
    },
    {
        key: "welcome-button-try-again",
        resources: [
            {
                language: "en",
                value: "Try reconnecting"
            },
            {
                language: "tr",
                value: "Yineden bağlanmayı deneyin"
            }
        ]
    },
    {
        key: "welcome-decription-no-connection",
        resources: [
            {
                language: "en",
                value: "There is no connection to transfer data, checkout your Wi-Fi connection status."
            },
            {
                language: "tr",
                value: "Veri transferi için bağlantı yok! Wi-Fi bağlantı durumunuzu kontrol edin!"
            }
        ]
    },
    {
        key: "welcome-description",
        resources: [
            {
                language: "en",
                value: "Scan QR code below to transfer data between devices by Wi-Fi"
            },
            {
                language: "tr",
                value: "Cihazlar arasında Wi-Fi üzerinden veri transferi yapmak için aşağıdaki QR kodu taratın"
            }
        ]
    },
    {
        key: "welcome-description-loading",
        resources: [
            {
                language: "en",
                value: "The application is getting ready..."
            },
            {
                language: "tr",
                value: "Uygulama kullanıma hazırlanıyor..."
            }
        ]
    }
]


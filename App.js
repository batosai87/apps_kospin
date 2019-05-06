import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Picker,
    TextInput,
    TouchableHighlight
} from "react-native";
// @ts-ignore
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
// @ts-ignore
import Loading from 'react-native-whc-loading';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-crop-picker';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataJk: [
                { label: 'Pria', value: 0 },
                { label: 'Wanita', value: 1 }
            ],
            avatarSrc: {},
            dataPekerjaan: ['Pelajar', 'Wiraswasta', 'Pegawai Negri Sipil'],
            formData: {
                nama: "",
                jk: 0,
                tgl_lahir: null,
                email: "",
                telp: "",
                pekerjaan: ""
            }
        }
    }

    _openGalery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            this.setState({
                avatarSrc: image
            })
          });
    }

    render() {
        // @ts-ignore
        const { nama, tgl_lahir, email, telp, pekerjaan } = this.state.formData;
        const sourceUri = this.state.avatarSrc.path
            ? { uri: this.state.avatarSrc.path  }
            : require("./src/img/noimage.png");

        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} enabled>
                    <View style={[styles.row, { alignItems: "center"}]}>
                        <TouchableHighlight onPress={this._openGalery}>
                            <Image
                                source={sourceUri} 
                                indicator={ProgressBar}
                                style={{
                                    width: 150,
                                    height: 150
                                }} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nama</Text>
                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid='blue'
                            onChangeText={nama =>
                                this.setState(prevState => ({
                                    formData: {
                                        ...prevState.formData,
                                        nama
                                    }

                                }))
                            }
                            value={nama}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.label, { marginBottom: 10 }]}>Jenis Kelamin</Text>
                        <RadioForm
                            radio_props={this.state.dataJk}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            labelStyle={{ paddingRight: 15 }}
                            buttonColor={'#2196f3'}
                            animation={true}
                            onPress={jk =>
                                this.setState(prevState => ({
                                    formData: {
                                        ...prevState.formData,
                                        jk
                                    }

                                }))
                            }
                        // onPress={(value) => { this.setState({ value: value }) }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.label, { marginBottom: 10 }]}>Tanggal Lahir</Text>
                        <DatePicker
                            style={{ width: '100%' }}
                            date={tgl_lahir}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    // marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(tgl_lahir) => {
                                this.setState(prevState => ({
                                    formData: {
                                        ...prevState.formData,
                                        tgl_lahir
                                    }

                                }))
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid='blue'
                            keyboardType="email-address"
                            onChangeText={email =>
                                this.setState(prevState => ({
                                    formData: {
                                        ...prevState.formData,
                                        email
                                    }

                                }))
                            }
                            value={email}
                        // onChangeText={(text) => this.setState({ text })}
                        // value={this.state.text}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>No. Telp</Text>
                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid='blue'
                            keyboardType="phone-pad"
                            onChangeText={telp =>
                                this.setState(prevState => ({
                                    formData: {
                                        ...prevState.formData,
                                        telp
                                    }

                                }))
                            }
                            value={telp}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pekerjaan</Text>
                        <Picker
                            selectedValue={pekerjaan}
                            style={{ height: 50 }}
                            onValueChange={pekerjaan =>
                                this.setState(prevState => ({
                                    formData: {
                                        ...prevState.formData,
                                        pekerjaan
                                    }
                                }))
                            }
                        >
                            {this.state.dataPekerjaan.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item}
                                    value={item.toLowerCase()} />
                            ))}
                        </Picker>
                    </View>

                    {/* BUTTON */}
                    <Text style={styles.label}>{JSON.stringify(this.state.formData)}</Text>
                    <View style={styles.row}>
                        <TouchableHighlight
                            onPress={this._saveData}
                            style={styles.btnContainer}>
                            <Text style={styles.txtBtn}>SIMPAN</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
                <Loading ref="loading" />
            </ScrollView>
        );
    }

    _saveData = async () => {
        // @ts-ignore
        let formDataPost = new FormData();
        const { avatarSrc, formData } = this.state;

        this.refs.loading.show();

        for(let p in formData) formDataPost.append(p, formData[p]);
        // kita masukin imagenya
        formDataPost.append('photo',{
            uri : avatarSrc.path,
            type : avatarSrc.mime,
            name : 'photo-profil'
        })
        try {
            await fetch('http://10.0.2.2/service.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formDataPost
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // return responseJson.movies;
                    setTimeout(() => {
                        // @ts-ignore
                        this.refs.loading.close();
                        alert(JSON.stringify(responseJson));
                    }, 2000);
                })
                .catch((error) => {
                    // @ts-ignore
                    this.refs.loading.close();
                    console.error(error);
                });
        } catch (error) {
            this.refs.loading.close();
            alert(error);
        }
    };
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    row: {
        marginBottom: 20
    },
    label: {
        fontSize: 20
    },
    txtInput: {
        height: 40,
        borderWidth: 0
    },
    btnContainer: {
        backgroundColor: '#1A8',
        padding: 10,
        alignItems: 'center',
    },
    txtBtn: {
        fontSize: 20,
        color: "white"
    }
});
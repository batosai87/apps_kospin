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
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import Loading from 'react-native-whc-loading';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataJk: [
                { label: 'Pria', value: 0 },
                { label: 'Wanita', value: 1 }
            ],
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


    render() {
        const {nama, jk,tgl_lahir,email,telp,pekerjaan } = this.state.formData;
         

        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} enabled>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nama</Text>
                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid='blue'
                            onChangeText={nama => 
                                this.setState(prevState => ({
                                    formData:{
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
                                    formData:{
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
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
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
                                    formData:{
                                    ...prevState.formData,
                                    tgl_lahir
                                    }
                                    
                                }))                            }}
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
                                    formData:{
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
                                    formData:{
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
                                <Text style={styles.txtBtn} SIMPAN></Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }

    _saveData = () => {
        alert(JSON.stringify(this.state.formData))
    }
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
        color: "red"
    }
});
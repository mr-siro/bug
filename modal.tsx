import React, { useState, useRef } from 'react';
import { FlatList, Keyboard, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import { Container, Content } from 'src/shared/styles';
import { Header, Submit, Button, Input } from 'src/views/components';
import { getString, myStrings } from 'src/shared/localizations';
import { AppRoute } from 'src/navigator/app-routes';
import Modal, { ModalContent } from 'react-native-modals';
import { theme, Dimensions } from 'src/shared';
import {
    ItemLeft,
    ItemRight,
    Date,
    Title,
    Description,
    Status,
    styles,
    Bottom,
    Reply,
    Close,
    ReplyText,
    CloseText
} from './../styles';

interface Props {
    navigation: StackNavigationProp<any, any>;
}

interface State {
    reply: string;
}

const ListTicket = ({ navigation }: Props) => {
    const [visible, setVisible] = useState(false);
    const [reply, setReply] = useState<string>('');
    const ticketList = [
        {
            id: 1,
            date: '25/09/2018',
            title: 'Where can I get some?',
            description: 'Withdrawal failed. Help me',
            status: 'Open'
        },
        {
            id: 2,
            date: '26/09/2018',
            title: 'Why do we use it?',
            description: 'Withdrawal failed. Help me',
            status: 'Open'
        }
    ];
    const redirectToCreate = () => {
        navigation.navigate(AppRoute.CREATETICKET);
    }

    const onChangeText = (key: string, value: string) => {
        setReply(value);
    }

    const renderModal = () => {
        setVisible(true);
    }
    const renderTicket = ({ item, index }: any) => {

        return (
            <Button
                buttonStyle={styles.buttonStyle}
                onPress={renderModal}
            >
                <ItemLeft>
                    <Date>{item.date}</Date>
                    <Title numberOfLines={2}>{item.title}</Title>
                    <Description numberOfLines={3}>{item.description}</Description>
                </ItemLeft>
                <ItemRight>
                    <Status>{item.status}</Status>
                </ItemRight>
            </Button>
        )
    }
    return (
        <Container>
            <Header text={getString(myStrings.text.listTicketTitle)} navigation={navigation} />
            <Content>
                <Submit
                    icon={
                        <Icon
                            name={'plus-circle'}
                            type='material-community'
                            color={theme.common.colorPrimary}
                        />
                    }
                    title="CREATE NEW TICKET"
                    onPress={redirectToCreate}
                />
                <FlatList
                    data={ticketList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderTicket}
                />
                <Modal

                    width={0.8}
                    height={0.31}
                    swipeDirection={['up', 'down']}
                    visible={visible}
                >
                    <ModalContent>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: Dimensions.Spacing.medium
                            }}>
                            <Title style={{ color: "#000000" }} numberOfLines={2}>title</Title>
                            <Date>date</Date>
                        </View>
                        <ItemLeft>
                            <Description numberOfLines={3}>des</Description>
                        </ItemLeft>
                        <Input
                            multiline={true}
                            type={'TEXT'}
                            value={reply}
                            onChangeText={value => onChangeText('reply', value)}
                            placeholder={'Description'}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            inputStyle={{ borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, height: 100 }}
                        />
                        <Bottom>
                            <Close onPress={() => setVisible(false)}>
                                <CloseText style={{ color: '#D20E0E' }}>Close</CloseText>
                            </Close>
                            <Reply onPress={() => setVisible(false)}>
                                <ReplyText style={{ color: '#047D00' }}>Reply</ReplyText>
                            </Reply>
                        </Bottom>

                    </ModalContent>
                </Modal>
            </Content>
        </Container>
    );
}
export default ListTicket;

import react, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../stores/userStore';
import { PieChart } from 'react-native-chart-kit';
import { getReportData } from '../../services/relatorioService';
import { StatusBar } from 'expo-status-bar';
import { 
    MaterialIcons, 
    MaterialCommunityIcons, 
    AntDesign, 
    Foundation, 
    Feather  
} from '@expo/vector-icons';

import Logo from '../../components/Logo';
import CardRelatorio from '../../components/cardRelatorio';
import ScreenLoader from '../../components/ScreenLoader';

import styles from './styles';
import colors from '../../constants/colors';

export default function Relatorio() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [dataGraphic, setDataGraphic] = useState(null);
    const navigation = useNavigation();
    const { name } = useUserStore();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const data = await getReportData();
            setData(data[0]);
            setDataGraphic([
                {
                    name: 'Alunos',
                    population: data[1].normalUsers,
                    color: colors.backgroundDarkColor,
                },
                {
                    name: 'Administradores',
                    population: data[1].adminUsers,
                    color: colors.primaryColor,
                },
            ]);
            setLoading(false);
        }

        getData();
    }, []);

    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Função que define a cor dos elementos do gráfico (linhas, fatias, etc)
    };

    if (loading) {
        return <ScreenLoader color="#000" size={36} />;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.headerTop}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <MaterialIcons
                                name="arrow-back"
                                size={30}
                                color={colors.primaryColor}
                            />
                        </TouchableOpacity>

                        <Logo width={100} height={60} />
                    </View>

                    <Text style={styles.textTittle}>Olá, administrador {name}!</Text>
                    <Text style={styles.descTittle}>Estas são suas estatisticas.</Text>
                </View>

                <View style={styles.containerInfoCard}>
                    <CardRelatorio
                        title="Total de usuários"
                        icon={<AntDesign name="user" size={24} color="black" />}
                        info={data.allUsers}
                        wholeNumber={true}
                    />
                    <CardRelatorio
                        title="Total de publicaões"
                        icon={
                            <MaterialCommunityIcons name="post-outline" size={24} color="black" />
                        }
                        info={data.allPosts}
                        wholeNumber={true}
                    />
                    <CardRelatorio
                        title="Média de curtidas por post"
                        icon={<AntDesign name="hearto" size={24} color="black" />}
                        info={data.avgLikesPerPost}
                    />
                    <CardRelatorio
                        title="Média de comentários por post"
                        icon={<Feather name="message-circle" size={24} color="black" />}
                        info={data.avgCommentPerPost}
                    />
                </View>

                <View style={styles.containerGraphic}>
                    <View style={styles.header}>
                        <Text>
                            Grafico de balanço de usuarios:
                        </Text>
                        <Foundation name="results-demographics" size={24} color="black" />
                    </View>

                    <PieChart
                        data={dataGraphic}
                        width={300}
                        height={300}
                        chartConfig={chartConfig}
                        accessor={'population'}
                        backgroundColor={'transparent'}
                        center={[75, 0]}
                        hasLegend={false}
                    />

                    <View style={styles.legendContainer}>
                        {dataGraphic.map((item, idx) => (
                            <View key={idx} style={styles.legendItem}>
                                <View
                                    style={[styles.legendColorBox, { backgroundColor: item.color }]}
                                />
                                <Text style={styles.legendText}>
                                    {item.name}: {item.population}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <StatusBar style={colors.backgroundGrayColor}/>
        </SafeAreaView>
    );
}

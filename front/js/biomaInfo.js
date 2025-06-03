const biomaColorsFile = {
    "Amazônia": "#005227",
    "Cerrado": "#ff3131",
    "Caatinga": "#ff914d",
    "Mata Atlântica": "#0b6ef5",
    "Pampa": "#ffde59",
    "Pantanal": "#7ed957"
};

window.biomaInfo = {
    "Amazônia": {
        titulo: "Amazônia",
        cor: biomaColorsFile["Amazônia"],
        descricao: "A maior floresta tropical úmida do planeta, onde mais de 90% dos peixes criados são espécies nativas, como o  pirarucu, ajudando a valorizar a biodiversidade local, concentra cerca de 15% da produção nacional de peixes.",
        imagens: [
            "fotos/amazonia/amazonia-1.jpg",
            "fotos/amazonia/amazonia-2.jpg"
        ],
        especies: [
            {
                nome: "Tambaqui",
                nomeCientifico: "Colossoma macropomum",
                imagem: "fotos/amazonia/peixes/tambaqui.png"
            },
            {
                nome: "Pirarucu",
                nomeCientifico: "Arapaima gigas",
                imagem: "fotos/amazonia/peixes/pirarucu.png"
            },
            {
                nome: "Matrinxã",
                nomeCientifico: "Brycon amazonicus",
                imagem: "fotos/amazonia/peixes/matrinxa.jpg"
            }
        ]
    },
    "Cerrado": {
        titulo: "Cerrado",
        cor: biomaColorsFile["Cerrado"],
        descricao: "A savana brasileira, berço de importantes rios, com árvores retorcidas e raízes profundas que buscam água, concentra cerca de 10% da produção nacional de peixes.",
        imagens: [
            "fotos/cerrado/cerrado1.png",
            "fotos/cerrado/cerrado2.jpg"
        ],
        especies: [
            {
                nome: "Tilápia do Nilo",
                nomeCientifico: "Oreochromis niloticus",
                imagem: "fotos/cerrado/peixes/tilapia.JPG"
            },
            {
                nome: "Tambaqui",
                nomeCientifico: "Colossoma macropomum",
                imagem: "fotos/cerrado/peixes/tambaqui.png"
            },
            {
                nome: "Panga",
                nomeCientifico: "Pangasianodon hypophthalmus",
                imagem: "fotos/cerrado/peixes/panga.jpg"
            }
        ]
    },
    "Caatinga": {
        titulo: "Caatinga",
        cor: biomaColorsFile["Caatinga"],
        descricao: "Bioma exclusivamente brasileiro de clima semiárido, onde a vida se adapta à seca, a tilápia domina, presente em 70% da produção local, representa cerca de 5% da produção nacional de peixes.",
        imagens: [
            "fotos/caatinga/caatinga.jpeg",
            "fotos/caatinga/caatinga2.jpg"
        ],
        especies: [
            {
                nome: "Tilápia do Nilo",
                nomeCientifico: "Oreochromis niloticus",
                imagem: "fotos/caatinga/peixes/tilapia.JPG"
            },
            {
                nome: "Tambaqui",
                nomeCientifico: "Colossoma macropomum",
                imagem: "fotos/caatinga/peixes/tambaqui.png"
            },
            {
                nome: "Carpa",
                nomeCientifico: "Cyprinus carpio",
                imagem: "fotos/caatinga/peixes/carpa.png"
            },
        ]
    },
    "Mata Atlântica": {
        titulo: "Mata Atlântica",
        cor: biomaColorsFile["Mata Atlântica"],
        descricao: "Floresta exuberante que acompanha a costa brasileira, hoje muito fragmentada e cheia de espécies ameaçadas, com mais de 70% da água doce do Brasil, represente cerca de 43% da produção nacional de peixes.",
        imagens: [
            "fotos/mata-atlantica/mataatlantica1.png",
            "fotos/mata-atlantica/mataatlantica2.png"
        ],
        especies: [
            {
                nome: "Tilápia do Nilo",
                nomeCientifico: "Oreochromis niloticus",
                imagem: "fotos/mata-atlantica/peixes/tilapia.JPG"
            },
            {
                nome: "Carpa",
                nomeCientifico: "Cyprinus carpio",
                imagem: "fotos/mata-atlantica/peixes/carpa.png"
            },
            {
                nome: "Truta Arco-Íris",
                nomeCientifico: "Oncorhychus mykiss",
                imagem: "fotos/mata-atlantica/peixes/truta-arco-iris.jpg"
            },

        ]
    },
    "Pampa": {
        titulo: "Pampa",
        cor: biomaColorsFile["Pampa"],
        descricao: "Campos abertos e vastos do extremo sul do Brasil, com estações bem definidas e clima frio no inverno, a piscicultura mistura espécies nativas e exóticas, representando menos de 2% da produção nacional de peixes.",
        imagens: [
            "fotos/pampa/pampa1.png",
            "fotos/pampa/pampa2.png"
        ],
        especies: [
            {
                nome: "Carpa",
                nomeCientifico: "Cyprinus carpio",
                imagem: "fotos/pampa/peixes/carpa.png"
            },
            {
                nome: "Tilápia do Nilo",
                nomeCientifico: "Oreochromis niloticus",
                imagem: "fotos/pampa/peixes/tilapia.JPG"
            },
            {
                nome: "Jundiá",
                nomeCientifico: "Rhamdia quelen",
                imagem: "fotos/pampa/peixes/JUNDIA.jpg"
            },
        ]
    },
    "Pantanal": {
        titulo: "Pantanal",
        cor: biomaColorsFile["Pantanal"],
        descricao: "A maior planície inundável do mundo, um santuário de vida selvagem que pulsa com as cheias e secas, mais de 80% dos peixes criados são nativos, como o pintado,  representa menos de 2% da produção nacional de peixes.",
        imagens: [
            "fotos/pantanal/pantanal1.jpg",
            "fotos/pantanal/pantanal2.jpg"
        ],
        especies: [
            {
                nome: "Tilápia do Nilo",
                nomeCientifico: "Oreochromis niloticus",
                imagem: "fotos/pantanal/peixes/tilapia.JPG"
            },
            {
                nome: "Pacu",
                nomeCientifico: "Piractus mesopotamicus",
                imagem: "fotos/pantanal/peixes/pacu.jpg"
            },
            {
                nome: "Pintado",
                nomeCientifico: "Pseudoplatystoma sp.",
                imagem: "fotos/pantanal/peixes/pintado.jpeg"
            }

        ]
    }
};

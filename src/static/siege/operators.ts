import { Primary, Secondary } from "./weapons";
import { filter, find } from "lodash";

enum Position {
    ATTACKER = "attacker",
    DEFENDER = "defender",
}

enum Role {
    // Should sort
    ANCHOR = "anchor",
    COVERING_FIRE = "covering-fire",
    INTEL_GATHERER = "intel-gatherer",
    INTEL_DENIER = "intel-denier",
    AREA_DENIAL = "area-denial",
    FRONT_LINE = "front-line",
    BACK_LINE = "back-line",
    SECURE = "secure",

    // Defenders
    TRAP = "trap",
    ROAM = "roam",
    FLANK = "flank",
    ANTI_HARD_BREACH = "anti-hard-breach",

    // Attackers
    HARD_BREACH = "hard-breach",
    DISABLE = "disable", // Disabling defender gadgets

    // Both Attackers and Defenders
    SHIELD = "shield",
    ANTI_ROAM = "anti-roam",
    BUFF = "buff", // Rook, Doc and Finka (for now)
    CROWD_CONTROL = "crowd-control",
    SOFT_BREACH = "soft-breach", // Thx to Oryx now it's for Both XD
}

enum Gadget {
    // Placable (Attackers)
    BREACH_CHARGE = "breach-charge",
    CLAYMORE = "claymore",
    SECONDARY_BREACHER = "secondary-breacher",

    // Throwable (Attackers)
    FRAG_GRENADE = "frag-grenade",
    STUN_GRENADE = "stun-grenade",
    SMOKE_GRENADE = "smoke-grenade",

    // Placable (Defenders)
    DEPLOYABLE_SHIELD = "deployable-shield",
    BARBED_WIRE = "barbed-wire",
    BULLETPROOF_CAMERA = "bulletproof-camera",

    // Throwable (Defenders)
    NITRO_CELL = "nitro-cell",
    PROXIMITY_ALARM = "proximity-alarm",
    IMPACT_GRENADE = "impact-grenade",
}

type SiegeOperator = {
    /**
     * @description Ubisoft unique identifier of the operator (Uses in old API calls)
     */
    // index: string;

    /**
     * @description Name could contain non-english letters like "Jäger"
     */
    name: string;

    /**
     * @description A URL friendly string from operator's name which can be used in routing of your web app
     */
    slug: string;
    position: Position;
    loadouts: {
        primary: Primary[];
        secondary: Secondary[];
        gadgets: Gadget[];
        ability: string;
    };
    roles: Role[];

    // TODO: remove optional and fill the fields
    armor?: 1 | 2 | 3;
    speed?: 1 | 2 | 3;
    profile?: {
        // TODO: add organization

        /**
         * @description Unit: Centimeter
         */
        height: number;

        /**
         * @description Unit: Kilogram
         */
        weight: number;

        /**
         * @description first name and last name
         */
        realName: string;

        birthDate: Date;
    };
};

const OPERATORS: SiegeOperator[] = [
    // SAS Attack
    {
        name: "Sledge",
        slug: "sledge",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.L85A2, Primary.M590A1],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.FRAG_GRENADE, Gadget.STUN_GRENADE],
            ability: "tactical-breaching-hammer",
        },
        roles: [Role.FLANK, Role.SOFT_BREACH],
        armor: 2,
        speed: 2,
        profile: {
            height: 192,
            weight: 95,
            realName: "Seamus Cowden",
            birthDate: new Date("2 April 1982"),
        },
    },
    {
        name: "Thatcher",
        slug: "thatcher",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AR33, Primary.L85A2, Primary.M590A1],
            secondary: [Secondary.P226_MK_25],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "emp-grenade",
        },
        roles: [Role.BACK_LINE, Role.DISABLE],
    },

    // SAS Defend
    {
        name: "Smoke",
        slug: "smoke",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.M590A1, Primary.FMG_9],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.DEPLOYABLE_SHIELD, Gadget.BARBED_WIRE],
            ability: "remote-gas-grenade",
        },
        roles: [Role.ANCHOR, Role.AREA_DENIAL, Role.SECURE],
    },
    {
        name: "Mute",
        slug: "mute",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5K, Primary.M590A1],
            secondary: [Secondary.P226_MK_25, Secondary.SMG_11],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.NITRO_CELL],
            ability: "signal-disruptor",
        },
        roles: [Role.ANTI_HARD_BREACH, Role.INTEL_DENIER, Role.SECURE],
    },

    // FBI Attack
    {
        name: "Ash",
        slug: "ash",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.G36C, Primary.R4_C],
            secondary: [Secondary._5_7_USG, Secondary.M45_MEUSOC],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.STUN_GRENADE],
            ability: "breaching-rounds",
        },
        roles: [Role.DISABLE, Role.FLANK, Role.FRONT_LINE, Role.SOFT_BREACH],
    },
    {
        name: "Thermite",
        slug: "thermite",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.M1014, Primary._556XI],
            secondary: [Secondary._5_7_USG, Secondary.M45_MEUSOC],
            gadgets: [Gadget.CLAYMORE, Gadget.STUN_GRENADE],
            ability: "exothermic-charge",
        },
        roles: [Role.BACK_LINE, Role.HARD_BREACH],
    },

    // FBI Defend
    {
        name: "Castle",
        slug: "castle",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.UMP45, Primary.M1014],
            secondary: [Secondary._5_7_USG, Secondary.SUPER_SHORTY],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.IMPACT_GRENADE],
            ability: "armor-panel",
        },
        roles: [Role.ANCHOR, Role.SECURE],
    },
    {
        name: "Pulse",
        slug: "pulse",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.UMP45, Primary.M1014],
            secondary: [Secondary._5_7_USG, Secondary.M45_MEUSOC],
            gadgets: [Gadget.BARBED_WIRE, Gadget.NITRO_CELL],
            ability: "heartbeat-sensor",
        },
        roles: [Role.INTEL_GATHERER, Role.ROAM],
    },

    // GIGN Attack
    {
        name: "Twitch",
        slug: "twitch",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.F2, Primary._417, Primary.SG_CQB],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "shock-drones",
        },
        roles: [Role.BACK_LINE, Role.DISABLE, Role.FRONT_LINE, Role.INTEL_GATHERER],
    },
    {
        name: "Montagne",
        slug: "montagne",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.LE_ROCK_SHIELD],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.SECONDARY_BREACHER, Gadget.SMOKE_GRENADE],
            ability: "le-rock-shield",
        },
        roles: [Role.SHIELD],
    },

    // GIGN Defend
    {
        name: "Doc",
        slug: "doc",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5, Primary.P90, Primary.SG_CQB],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.BARBED_WIRE],
            ability: "stim-pistol",
        },
        roles: [Role.ANCHOR, Role.BUFF],
    },
    {
        name: "Rook",
        slug: "rook",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5, Primary.P90, Primary.SG_CQB],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.IMPACT_GRENADE],
            ability: "armor-pack",
        },
        roles: [Role.ANCHOR, Role.BUFF],
    },

    // Spetsnaz Attack
    {
        name: "Glaz",
        slug: "glaz",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.OTS_3],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.SMOKE_GRENADE, Gadget.FRAG_GRENADE],
            ability: "flip-sight",
        },
        roles: [Role.BACK_LINE, Role.COVERING_FIRE, Role.SOFT_BREACH],
    },
    {
        name: "Fuze",
        slug: "fuze",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AK_12, Primary._6P41, Primary.BALLISTIC_SHIELD],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.SECONDARY_BREACHER],
            ability: "cluster-charge",
        },
        roles: [Role.AREA_DENIAL, Role.DISABLE, Role.FLANK],
    },

    // Spetsnaz Defend
    {
        name: "Kapkan",
        slug: "kapkan",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary._9X19VSN, Primary.SASG_12],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.IMPACT_GRENADE, Gadget.NITRO_CELL],
            ability: "entry-denial-device",
        },
        roles: [Role.TRAP],
    },
    {
        name: "Tachanka",
        slug: "tachanka",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.DP27, Primary._9X19VSN],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.BARBED_WIRE, Gadget.PROXIMITY_ALARM],
            ability: "shumikha-launcher",
        },
        roles: [Role.ANCHOR, Role.COVERING_FIRE],
    },

    // GSG 9 Attack
    {
        name: "Blitz",
        slug: "blitz",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.G52_TACTICAL_SHIELD],
            secondary: [Secondary.P12],
            gadgets: [Gadget.SMOKE_GRENADE, Gadget.BREACH_CHARGE],
            ability: "flash-shield",
        },
        roles: [Role.ANTI_ROAM, Role.CROWD_CONTROL, Role.FRONT_LINE, Role.SHIELD],
    },
    {
        name: "IQ",
        slug: "iq",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AUG_A2, Primary._552_COMMANDO, Primary.G8A1],
            secondary: [Secondary.P12],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "electronics-detector",
        },
        roles: [Role.DISABLE, Role.FLANK, Role.FRONT_LINE, Role.INTEL_GATHERER],
    },

    // GSG 9 Defend
    {
        name: "Jäger",
        slug: "jager",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.M870, Primary._416_C_CARBINE],
            secondary: [Secondary.P12],
            gadgets: [Gadget.BARBED_WIRE, Gadget.BULLETPROOF_CAMERA],
            ability: "active-defense-system",
        },
        roles: [Role.ROAM, Role.SECURE],
    },
    {
        name: "Bandit",
        slug: "bandit",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP7, Primary.M870],
            secondary: [Secondary.P12],
            gadgets: [Gadget.BARBED_WIRE, Gadget.NITRO_CELL],
            ability: "shock-wire",
        },
        roles: [Role.ANTI_HARD_BREACH, Role.ROAM, Role.SECURE],
    },

    // JTF2 Attack
    {
        name: "Buck",
        slug: "buck",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.C8_SFW, Primary.CAMRS],
            secondary: [Secondary.MK1_9MM],
            gadgets: [Gadget.CLAYMORE, Gadget.STUN_GRENADE],
            ability: "skeleton-key",
        },
        roles: [Role.FLANK, Role.SOFT_BREACH],
    },

    // JTF2 Defend
    {
        name: "Frost",
        slug: "frost",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.SUPER_90, Primary._9MM_C1],
            secondary: [Secondary.MK1_9MM, Secondary.ITA12S],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.DEPLOYABLE_SHIELD],
            ability: "welcome-mate", // I'm aware that it's welcome "mat", not sure why Ubisoft API returns "mate"
        },
        roles: [Role.CROWD_CONTROL, Role.TRAP],
    },

    // Navy SEALs Attack
    {
        name: "Blackbeard",
        slug: "blackbeard",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.MK17_CQB, Primary.SR_25],
            secondary: [Secondary.D_50],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.STUN_GRENADE],
            ability: "rifle-shield",
        },
        roles: [Role.BACK_LINE, Role.COVERING_FIRE, Role.SHIELD],
    },

    // Navy SEALs Defend
    {
        name: "Valkyrie",
        slug: "valkyrie",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MPX, Primary.SPAS_12],
            secondary: [Secondary.D_50],
            gadgets: [Gadget.DEPLOYABLE_SHIELD, Gadget.NITRO_CELL],
            ability: "black-eye",
        },
        roles: [Role.INTEL_GATHERER, Role.ROAM],
    },

    // BOPE Attack
    {
        name: "CAPITÃO",
        slug: "capitao",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.PARA_308, Primary.M249],
            secondary: [Secondary.PRB92],
            gadgets: [Gadget.CLAYMORE, Gadget.SECONDARY_BREACHER],
            ability: "tactical-crossbow",
        },
        roles: [Role.AREA_DENIAL, Role.FLANK, Role.FRONT_LINE],
    },

    // BOPE Defend
    {
        name: "Caveira",
        slug: "caveira",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.M12, Primary.SPAS_15],
            secondary: [Secondary.LUISON],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.IMPACT_GRENADE],
            ability: "silent-step",
        },
        roles: [Role.INTEL_DENIER, Role.INTEL_GATHERER, Role.ROAM],
    },

    // SAT Attack
    {
        name: "Hibana",
        slug: "hibana",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.TYPE_89, Primary.SUPERNOVA],
            secondary: [Secondary.P229, Secondary.BEARING_9],
            gadgets: [Gadget.STUN_GRENADE, Gadget.BREACH_CHARGE],
            ability: "x-kairos",
        },
        roles: [Role.BACK_LINE, Role.FRONT_LINE, Role.HARD_BREACH],
    },

    // SAT Defend
    {
        name: "Echo",
        slug: "echo",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5SD, Primary.SUPERNOVA],
            secondary: [Secondary.P229, Secondary.BEARING_9],
            gadgets: [Gadget.IMPACT_GRENADE, Gadget.BARBED_WIRE],
            ability: "yokai",
        },
        roles: [Role.ANCHOR, Role.CROWD_CONTROL, Role.INTEL_GATHERER, Role.SECURE],
    },

    // GEO Attack
    {
        name: "Jackal",
        slug: "jackal",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.C7E, Primary.PDW9, Primary.ITA12L],
            secondary: [Secondary.USP40, Secondary.ITA12S],
            gadgets: [Gadget.CLAYMORE, Gadget.STUN_GRENADE],
            ability: "eyenox-model-iii",
        },
        roles: [Role.ANTI_ROAM, Role.INTEL_GATHERER],
    },

    // GEO Defend
    {
        name: "Mira",
        slug: "mira",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.VECTOR_45_ACP, Primary.ITA12L],
            secondary: [Secondary.USP40, Secondary.ITA12S],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.NITRO_CELL],
            ability: "black-mirror",
        },
        roles: [Role.ANCHOR, Role.INTEL_GATHERER, Role.SECURE],
    },

    // SDU Attack
    {
        name: "Ying",
        slug: "ying",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.T_95_LSW, Primary.SIX12],
            secondary: [Secondary.Q_929],
            gadgets: [Gadget.SECONDARY_BREACHER, Gadget.SMOKE_GRENADE],
            ability: "candela",
        },
        roles: [Role.CROWD_CONTROL, Role.FRONT_LINE],
    },

    // SDU Defend
    {
        name: "Lesion",
        slug: "lesion",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.SIX12_SD, Primary.T_5_SMG],
            secondary: [Secondary.Q_929],
            gadgets: [Gadget.IMPACT_GRENADE, Gadget.BULLETPROOF_CAMERA],
            ability: "gu-mines",
        },
        roles: [Role.ANCHOR, Role.CROWD_CONTROL, Role.INTEL_GATHERER, Role.ROAM, Role.TRAP],
    },

    // GROM Attack
    {
        name: "Zofia",
        slug: "zofia",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.LMG_E, Primary.M762],
            secondary: [Secondary.RG15],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "ks79-lifeline",
        },
        roles: [Role.ANTI_ROAM, Role.CROWD_CONTROL, Role.DISABLE, Role.FLANK, Role.SOFT_BREACH],
    },

    // GROM Defend
    {
        name: "Ela",
        slug: "ela",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.SCORPION_EVO_3_A1, Primary.F0_12],
            secondary: [Secondary.RG15],
            gadgets: [Gadget.BARBED_WIRE, Gadget.DEPLOYABLE_SHIELD],
            ability: "grzmot-mine",
        },
        roles: [Role.CROWD_CONTROL, Role.ROAM, Role.TRAP],
    },

    // 707th SMB Attack
    {
        name: "Dokkaebi",
        slug: "dokkaebi",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.MK_14_EBR, Primary.BOSG_12_2],
            secondary: [Secondary.C75_AUTO, Secondary.SMG_12],
            gadgets: [Gadget.SMOKE_GRENADE, Gadget.STUN_GRENADE],
            ability: "logic-bomb",
        },
        roles: [Role.ANTI_ROAM, Role.FLANK, Role.INTEL_GATHERER, Role.INTEL_DENIER],
    },

    // 707th SMB Defend
    {
        name: "Vigil",
        slug: "vigil",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.K1A, Primary.BOSG_12_2],
            secondary: [Secondary.C75_AUTO, Secondary.SMG_12],
            gadgets: [Gadget.BULLETPROOF_CAMERA, Gadget.IMPACT_GRENADE],
            ability: "erc-7",
        },
        roles: [Role.INTEL_DENIER, Role.ROAM],
    },

    // CBRN Attack
    {
        name: "Lion",
        slug: "lion",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.V308, Primary._417, Primary.SG_CQB],
            secondary: [Secondary.P9, Secondary.LFP586],
            gadgets: [Gadget.STUN_GRENADE, Gadget.SECONDARY_BREACHER],
            ability: "ee-one-d",
        },
        roles: [Role.ANTI_ROAM, Role.BACK_LINE, Role.CROWD_CONTROL, Role.INTEL_GATHERER],
    },
    {
        name: "Finka",
        slug: "finka",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.SPEAR_308, Primary._6P41, Primary.SASG_12],
            secondary: [Secondary.PMM, Secondary.GSH_18],
            gadgets: [Gadget.SECONDARY_BREACHER, Gadget.FRAG_GRENADE],
            ability: "adrenal-surge",
        },
        roles: [Role.BACK_LINE, Role.BUFF],
    },

    // GIS Defend
    {
        name: "Maestro",
        slug: "maestro",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.ALDA_5_56, Primary.ACS12],
            secondary: [Secondary.KERATOS_357, Secondary.BAILIFF_410],
            gadgets: [Gadget.BARBED_WIRE, Gadget.IMPACT_GRENADE],
            ability: "evil-eye",
        },
        roles: [Role.ANCHOR, Role.AREA_DENIAL, Role.INTEL_GATHERER, Role.SECURE],
    },
    {
        name: "Alibi",
        slug: "alibi",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MX4_STORM, Primary.ACS12],
            secondary: [Secondary.KERATOS_357, Secondary.BAILIFF_410],
            gadgets: [Gadget.IMPACT_GRENADE, Gadget.DEPLOYABLE_SHIELD],
            ability: "prisma",
        },
        roles: [Role.INTEL_DENIER, Role.INTEL_GATHERER, Role.ROAM, Role.TRAP],
    },

    // GSUTR Attack
    {
        name: "Maverick",
        slug: "maverick",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AR_15_50, Primary.M4],
            secondary: [Secondary._1911_TACOPS],
            gadgets: [Gadget.FRAG_GRENADE, Gadget.CLAYMORE],
            ability: "breaching-torch",
        },
        roles: [Role.BACK_LINE, Role.DISABLE, Role.FLANK, Role.HARD_BREACH],
    },

    // GSUTR Defend
    {
        name: "Clash",
        slug: "clash",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.CCE_SHIELD],
            secondary: [Secondary.P_10C, Secondary.SPSMG9],
            gadgets: [Gadget.BARBED_WIRE, Gadget.IMPACT_GRENADE],
            ability: "cce-shield",
        },
        roles: [Role.CROWD_CONTROL, Role.INTEL_GATHERER, Role.SECURE, Role.SHIELD],
    },

    // GIGR Attack
    {
        name: "Nomad",
        slug: "nomad",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AK_74M, Primary.ARX200],
            secondary: [Secondary.PRB92, Secondary._44_mag_semi_auto],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.STUN_GRENADE],
            ability: "airjab-launcher",
        },
        roles: [Role.ANTI_ROAM, Role.CROWD_CONTROL, Role.TRAP],
    },

    // GIGR Defend
    {
        name: "Kaid",
        slug: "kaid",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.AUG_A3, Primary.TCSG12],
            secondary: [Secondary._44_mag_semi_auto, Secondary.LFP586],
            gadgets: [Gadget.BARBED_WIRE, Gadget.NITRO_CELL],
            ability: "rtila-electroclaw",
        },
        roles: [Role.ANCHOR, Role.ANTI_HARD_BREACH, Role.SECURE],
    },

    // SASR Attack
    {
        name: "Gridlock",
        slug: "gridlock",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.F90, Primary.M249_SAW],
            secondary: [Secondary.SUPER_SHORTY, Secondary.SDP_9MM],
            gadgets: [Gadget.SMOKE_GRENADE, Gadget.BREACH_CHARGE],
            ability: "trax-stingers",
        },
        roles: [Role.ANTI_ROAM, Role.AREA_DENIAL, Role.CROWD_CONTROL],
    },

    // SASR Defend
    {
        name: "Mozzie",
        slug: "mozzie",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.COMMANDO_9, Primary.P10_RONI],
            secondary: [Secondary.SDP_9MM],
            gadgets: [Gadget.BARBED_WIRE, Gadget.NITRO_CELL],
            ability: "pest-launcher",
        },
        roles: [Role.INTEL_DENIER, Role.INTEL_GATHERER, Role.SECURE],
    },

    // Jaeger Corps Attack
    {
        name: "NØKK",
        slug: "nokk",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.FMG_9, Primary.SIX12_SD],
            secondary: [Secondary._5_7_USG, Secondary.D_50],
            gadgets: [Gadget.SECONDARY_BREACHER, Gadget.FRAG_GRENADE],
            ability: "hel-presence-reduction",
        },
        roles: [Role.FLANK, Role.INTEL_DENIER],
    },

    // Secret Service Defend
    {
        name: "Warden",
        slug: "warden",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.M590A1, Primary.MPX],
            secondary: [Secondary.P_10C, Secondary.SMG_12],
            gadgets: [Gadget.DEPLOYABLE_SHIELD, Gadget.NITRO_CELL],
            ability: "glance-smart-glasses",
        },
        roles: [Role.ANCHOR, Role.INTEL_DENIER],
    },

    // APCA Attack
    {
        name: "Amaru",
        slug: "amaru",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.G8A1, Primary.SUPERNOVA],
            secondary: [Secondary.ITA12S, Secondary.SMG_11],
            gadgets: [Gadget.STUN_GRENADE, Gadget.SECONDARY_BREACHER],
            ability: "garra-hook",
        },
        roles: [Role.FLANK, Role.FRONT_LINE],
    },

    // FES Defend
    {
        name: "Goyo",
        slug: "goyo",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.VECTOR_45_ACP, Primary.TCSG12],
            secondary: [Secondary.P229],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.NITRO_CELL],
            ability: "volcan-shield",
        },
        roles: [Role.AREA_DENIAL, Role.SECURE],
    },

    // NIGHTHAVEN Attack
    {
        name: "Kali",
        slug: "kali",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.CSRX_300],
            secondary: [Secondary.SPSMG9, Secondary.C75_AUTO],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.CLAYMORE],
            ability: "lv-explosive-lance",
        },
        roles: [Role.BACK_LINE, Role.COVERING_FIRE, Role.DISABLE],
    },

    // NIGHTHAVEN Defend
    {
        name: "Wamai",
        slug: "wamai",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.AUG_A2, Primary.MP5K],
            secondary: [Secondary.D_40, Secondary.P12],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.DEPLOYABLE_SHIELD],
            ability: "mag-net-system",
        },
        roles: [Role.ANCHOR, Role.SECURE],
    },

    // REU Attack
    {
        name: "Iana",
        slug: "iana",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.ARX200, Primary.G36C],
            secondary: [Secondary.MK1_9MM],
            gadgets: [Gadget.FRAG_GRENADE, Gadget.SMOKE_GRENADE],
            ability: "gemini-replicator",
        },
        roles: [Role.INTEL_DENIER, Role.INTEL_GATHERER],
    },

    // GIGR (Unaffiliated) Defend
    {
        name: "Oryx",
        slug: "oryx",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.SPAS_12, Primary.T_5_SMG],
            secondary: [Secondary.BAILIFF_410, Secondary.USP40],
            gadgets: [Gadget.BARBED_WIRE, Gadget.PROXIMITY_ALARM],
            ability: "remah-dash",
        },
        roles: [Role.ROAM, Role.SOFT_BREACH],
    },

    // NIGHTHAVEN Attack
    {
        name: "Ace",
        slug: "ace",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.AK_12, Primary.M1014],
            secondary: [Secondary.P9],
            gadgets: [Gadget.BREACH_CHARGE, Gadget.SMOKE_GRENADE],
            ability: "selma-aqua-breacher",
        },
        roles: [Role.FRONT_LINE, Role.HARD_BREACH],
    },

    // ITF Defend
    {
        name: "Melusi",
        slug: "melusi",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.MP5, Primary.SUPER_90],
            secondary: [Secondary.RG15],
            gadgets: [Gadget.IMPACT_GRENADE, Gadget.NITRO_CELL],
            ability: "banshee",
        },
        roles: [Role.CROWD_CONTROL, Role.INTEL_GATHERER, Role.SECURE],
    },

    // ROS Attack
    {
        name: "Zero",
        slug: "zero",
        position: Position.ATTACKER,
        loadouts: {
            primary: [Primary.SC3000K, Primary.MP7],
            secondary: [Secondary._5_7_USG],
            gadgets: [Gadget.FRAG_GRENADE, Gadget.CLAYMORE],
            ability: "argus-launcher",
        },
        roles: [Role.INTEL_DENIER, Role.INTEL_GATHERER],
    },

    // NIGHTHAVEN Defend
    {
        name: "Aruni",
        slug: "aruni",
        position: Position.DEFENDER,
        loadouts: {
            primary: [Primary.P10_RONI, Primary.MK_14_EBR],
            secondary: [Secondary.PRB92],
            gadgets: [Gadget.PROXIMITY_ALARM, Gadget.BARBED_WIRE],
            ability: "surya-gate",
        },
        roles: [Role.SECURE, Role.INTEL_GATHERER, Role.ANCHOR],
    },

    // {
    //     name: "",
    //     slug: "",
    //     position: Position.ATTACKER,
    //     loadouts: {
    //         primary: [],
    //         secondary: [],
    //         gadgets: [],
    //         ability: "",
    //     },
    //     roles: [],
    // },
    // {
    //     name: "",
    //     slug: "",
    //     position: Position.DEFENDER,
    //     loadouts: {
    //         primary: [],
    //         secondary: [],
    //         gadgets: [],
    //         ability: "",
    //     },
    //     roles: [],
    // },
];

export class Operators {
    static readonly all: SiegeOperator[] = OPERATORS;
    static readonly attackers: SiegeOperator[] = filter(OPERATORS, { position: Position.ATTACKER });
    static readonly defenders: SiegeOperator[] = filter(OPERATORS, { position: Position.DEFENDER });

    static findBySlug(slug: string): SiegeOperator {
        const result = find(OPERATORS, { slug: slug });
        if (result) {
            return result;
        }
        throw new Error(`Could not find any operator with provided slug [${slug}]`);
    }
}

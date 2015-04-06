layout: post
title: "POS Specification"
category: JavaScript
tags: [javascript]
---
##[ARTS](http://www.nrf-arts.org/ "Learn more about ARTS.")

The Association for Retail Technology Standards (ARTS) of the National Retail Federation is an international membership organization dedicated to reducing the costs of technology through standards. Since 1993, ARTS has been delivering application standards exclusively to the retail industry. ARTS has four standards: 

<!-- more -->

- The Standard Relational Data Model
- UnifiedPOS
- XML
- the Standard RFPs (in partnership with NRF). 
 
Membership is open to all members of the international technology community-- retailers from all industry segments, application developers and hardware companies.Their work has a major impact on the development of retail technology that retailers can trust to be flexible and cost-effective.

ARTS standards help retailers do everything from integrating POS data from social networking sites with their CRM systems to tracking the produce sold in grocery stores back to the farm that grew it.

描述ARTS的动画片：[Retail's BIG Blog | Charting the value of ARTS](http://blog.nrf.com/2013/10/25/charting-the-value-of-arts/)

###[ARTS Data Model](http://www.nrf-arts.org/content/arts-data-model-home-page)

The [ARTS Operational Data Model](http://www.nrf-arts.org/content/arts-operational-data-model-overview) represents a relational transaction-oriented view of retail enterprise data. It is normalized and designed to support the day-to-day transactional functions performed by a retail enterprise. This model is referred to the Operational Data Model.

The [ARTS Data Warehouse Model (DWM)](http://www.nrf-arts.org/content/arts-data-warehouse-model-overview) supports business reporting and analysis. The DWM is designed around a star schema approach that supports end-user data query, reporting and analysis.

参考：[ARTS Data Model Home Page | NRF ARTS](http://www.nrf-arts.org/content/arts-data-model-home-page)

###[UnifiedPOS](http://www.nrf-arts.org/content/unifiedpos)

UnifiedPOS is the acronym for __Unified Point of Service__ and version 1.14 is the current standard. 

It is an architectural specification for application interfaces to point-of-service devices that are used in the retail environment. This standard, which has been in existence for several years, is both operating system-independent and language neutral and defines: 

* An architecture for application interface to retail devices.
* A set of retail device behaviors sufficient to support a range of POS solutions.

ARTS has published a new release of its **Unified Point of Service (UnifiedPOS) 1.14**, which includes expanded content to the Scale and Electronic Value Reader/Writer devices. 

**Web Services for Point of Service (WS-POS)** is a technical document intended to provide retail devices, terminals and servers with the capabilities necessary to interoperate in a detached, dynamic network as well as more typical retail LANs by leveraging these W3C specifications. 

__Download:__

**UnifiedPOS 1.14:** Version1.14 is now the standard and is available for download. [Download UnifiedPOS 1.14](http://www.nrf-arts.org/sites/default/files/UnifiedPOS%20Version%201_14_Released_07_15_2013_0.zip) (12 mb pdf)

**WS-POS 1.2:** Download the latest version of Web Services for Point of Service in English (Japanese to follow soon). ARTS thanks our partners, OPOS-J in Japan,for their support and for translation services. 

- [Download WS-POS 1.2 English](http://www.nrf-arts.org/sites/default/files/WS-POS1.2_Files_Released_07152013.zip) (9mb PDF)  
- [Download WS-POS 1.2 Japanese](http://www.nrf-arts.org/sites/default/files/WSPOS1_2_Technical_Specification_2013_July_15_JP_20130730.pdf) (2.3mb PDF)
- [Download WS-POS 1.2 Reference Implementation Files](http://www.nrf-arts.org/sites/default/files/WSPOS_Refer_Impl_v3_20130909.zip)(55mb English and Japanese)

##GlobalPlatform

GlobalPlatform is a cross industry, non-profit association which identifies, develops and publishes specifications that promote the secure and interoperable deployment and management of multiple applications on __secure chip technology__.

GlobalPlatform's objective is to create a standardized infrastructure that accelerates the deployment of secure applications and their associated assets, such as data and cryptographic keys, while protecting them from physical or software attacks. It achieves this by publishing and advancing specifications which address:

- SE(Secure Element). __A secure element (SE) is a tamper-resistant platform (typically a one chip secure microcontroller)__ capable of securely hosting applications and their confidential and cryptographic data (e.g. key management) in accordance with the rules and security requirements set forth by a set of well-identified trusted authorities. The SE is comprised of software and tamper resistant hardware. It allows high levels of security and can even work in tandem with the TEE. The SE is mandatory for hosting proximity payment applications or official electronic signatures where the highest level of security is required. The TEE may also offer a trusted user interface to securely transmit a personal identification number (PIN), which is required in order to make high value transactions. It also filters access to applications stored directly on the SE.

- TEE(Trusted Execution Environment). GlobalPlatform's work to standardize the TEE -__ a secure area that resides in the main processor of a connected device which ensures that sensitive data is stored, processed and protected in a trusted environment__ - supports the needs of smart device stakeholders, such as smartphone and tablet application developers and device manufacturers. The advancement of this technology is crucial for mobile wallets, NFC payment implementations, premium content protection and bring your own device (BYOD) initiatives.For example, the TEE is the ideal environment for content providers offering a video for a limited period of time that need to keep their premium content (e.g. HD video) secure so that it cannot be shared for free. 

- Messaging. GlobalPlatform clarifies how market participants from the finance, mobile NFC, government and transit sectors can connect their backend systems to the SE, TEE and any other actor within a secure application's ecosystem. This is achieved by defining 'who' is responsible for 'what' and agreeing the 'language' (messages) that will be used. GlobalPlatform Mobile Messaging can be used over-the-air via a mobile network as well as over-the-internet using the cloud environment. This supports trusted service managers (TSMs), as well as the issuance and personalization of secure chip and TEE technology.

![](http://johnnyimages.qiniudn.com/tee-spot-img.png)

参考：[Trusted Execution Environment (TEE) Guide](http://www.globalplatform.org/mediaguidetee.asp)

###内容

其提供的规范包括：

- [Card](http://www.globalplatform.org/specificationscard.asp)  
- [Device](http://www.globalplatform.org/specificationsdevice.asp)  
- [Systems](http://www.globalplatform.org/specificationssystems.asp)










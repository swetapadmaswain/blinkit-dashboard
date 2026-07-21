# AI-Powered Discovery Engine for Blinkit - Problem Statement

## 1. Problem Background

Blinkit, India's leading quick-commerce platform, delivers groceries and essentials to millions of customers within minutes. In the rapidly evolving landscape of quick-commerce, understanding user behavior, preferences, and discovery patterns is critical for Blinkit's business growth and customer satisfaction. The platform faces challenges in gaining comprehensive insights into:

- How users discover and explore new product categories
- What barriers prevent category exploration
- The role of habits in shopping behavior
- Unmet needs that emerge across different user segments
- Frustrations that repeatedly surface in user feedback

Current approaches to understanding user behavior are fragmented, relying on isolated data sources and manual analysis. There is a need for an integrated, AI-powered system that can analyze multi-source data at scale to uncover actionable insights about user discovery patterns.

## 2. Problem Statement

**Build an AI-Powered Discovery Engine for Blinkit** that aggregates and analyzes user-generated content from multiple platforms to understand shopping behavior, category exploration patterns, and unmet user needs. The system should transform unstructured data from reviews, discussions, and social conversations into structured, actionable insights specifically tailored to Blinkit's quick-commerce context, helping the platform optimize category discovery, reduce user friction, and identify expansion opportunities.

## 3. Primary Objectives

### 3.1 Data Aggregation & Integration
- Collect and normalize data from diverse sources (App Store, Play Store, Reddit, forums, social media, product reviews, quick-commerce discussions)
- Handle varying data formats, structures, and volumes
- Establish data pipelines for continuous ingestion

### 3.2 Behavioral Analysis
- Identify patterns in category exploration and repeat purchases
- Analyze habit formation and its impact on shopping behavior
- Segment users based on exploration propensity
- Map user journeys from discovery to purchase

### 3.3 Insight Generation
- Extract recurring themes, frustrations, and unmet needs
- Identify barriers to category exploration
- Determine information gaps that prevent experimentation
- Surface opportunities for improving discovery experiences

### 3.4 Question Answering
The system must provide data-driven answers to:
1. Why do users repeatedly buy from the same categories?
2. What prevents users from exploring new categories?
3. How do users discover products today?
4. What role do habits play in shopping behavior?
5. What information do users need before trying a new category?
6. What frustrations emerge repeatedly?
7. Which user segments are more likely to experiment?
8. What unmet needs emerge consistently across discussions?

## 4. Data Sources

### 4.1 App Store Reviews
- iOS app reviews and ratings
- User feedback on app functionality
- Feature requests and complaints

### 4.2 Play Store Reviews
- Android app reviews and ratings
- Platform-specific user feedback
- Device-related issues and patterns

### 4.3 Reddit Discussions
- Subreddit conversations relevant to products/services
- AMAs (Ask Me Anything) sessions
- Community-driven recommendations and discussions

### 4.4 Community Forums
- Niche community platforms (e.g., Stack Overflow, specialized forums)
- User-to-user support discussions
- Product comparison threads

### 4.5 Social Media Conversations
- Twitter/X threads and mentions
- Facebook groups and discussions
- Instagram comments and engagement
- LinkedIn professional discussions

### 4.6 Product Reviews
- E-commerce platform reviews (Amazon, etc.)
- Dedicated review sites (Yelp, TripAdvisor)
- Video reviews and unboxing content

### 4.7 Quick-Commerce Discussions
- Blinkit app discussions and feedback
- Competitor quick-commerce app discussions (Zepto, Swiggy Instamart, etc.)
- Last-mile delivery feedback
- Real-time shopping behavior patterns
- Delivery time and availability discussions

## 5. Technical Requirements

### 5.1 Data Ingestion
- APIs for platform-specific data access
- Web scraping capabilities for platforms without APIs
- Rate limiting and compliance with platform terms of service
- Data validation and quality checks

### 5.2 Natural Language Processing
- Sentiment analysis for reviews and discussions
- Topic modeling and keyword extraction
- Named entity recognition for product/category identification
- Intent classification for user behavior understanding
- Multi-language support (if applicable)

### 5.3 Data Storage & Processing
- Scalable database architecture (e.g., PostgreSQL, MongoDB)
- Data warehousing for historical analysis
- Real-time processing capabilities for streaming data
- Efficient indexing for fast query performance

### 5.4 Analytics & Visualization
- Dashboard for key metrics and insights
- Trend analysis over time
- Segment-based reporting
- Export capabilities for downstream analysis

### 5.5 Machine Learning Models
- Clustering for user segmentation
- Classification for category prediction
- Anomaly detection for emerging patterns
- Recommendation engine for discovery optimization

## 6. Key Features

### 6.1 Category Exploration Analysis
- Track user movement across categories
- Identify "sticky" categories vs. exploratory behavior
- Measure category discovery rates
- Analyze time-to-exploration metrics

### 6.2 Habit Detection
- Identify repeat purchase patterns
- Detect habitual vs. intentional shopping
- Measure habit strength and frequency
- Analyze habit disruption events

### 6.3 Barrier Identification
- Classify types of barriers (price, trust, information, convenience)
- Quantify barrier impact on exploration
- Track barrier resolution over time
- Identify platform-specific barriers

### 6.4 User Segmentation
- Segment by exploration propensity (high, medium, low)
- Segment by category preferences
- Segment by engagement level
- Segment by frustration themes

### 6.5 Unmet Needs Detection
- Extract explicit requests and complaints
- Identify implicit needs through pattern analysis
- Prioritize needs by frequency and impact
- Track need fulfillment over time

## 7. Success Metrics

### 7.1 Data Coverage
- Number of data sources integrated
- Data freshness (latency from source to system)
- Data completeness across sources
- Historical data depth

### 7.2 Insight Quality
- Accuracy of sentiment classification
- Precision of topic extraction
- Recall of unmet needs identification
- Actionability of generated insights

### 7.3 Business Impact
- Reduction in time-to-insight for Blinkit business teams
- Number of actionable insights generated per week
- Adoption rate of recommendations by product and category teams
- Impact on category exploration rates on Blinkit platform
- Improvement in user retention and order frequency
- Reduction in customer support tickets related to discovery issues

### 7.4 System Performance
- Query response time
- Data processing throughput
- System uptime and reliability
- Scalability under increased load

## 8. Implementation Phases

### Phase 1: Foundation (Weeks 1-4)
- Set up data infrastructure
- Integrate 2-3 primary data sources
- Implement basic NLP pipelines
- Create initial data models

### Phase 2: Core Analytics (Weeks 5-8)
- Implement sentiment analysis
- Build topic modeling capabilities
- Create category exploration tracking
- Develop user segmentation models

### Phase 3: Advanced Features (Weeks 9-12)
- Integrate remaining data sources
- Implement habit detection algorithms
- Build barrier identification system
- Create unmet needs detection

### Phase 4: Visualization & Reporting (Weeks 13-16)
- Build analytics dashboard
- Implement trend analysis
- Create segment-based reporting
- Develop export and alerting capabilities

### Phase 5: Optimization & Scaling (Weeks 17-20)
- Optimize model performance
- Improve data pipeline efficiency
- Scale infrastructure
- Implement advanced ML features

## 9. Constraints & Considerations

### 9.1 Data Privacy & Compliance
- GDPR/CCPA compliance for user data
- Platform terms of service adherence
- Anonymization of personally identifiable information
- Data retention policies

### 9.2 Technical Constraints
- API rate limits from platforms
- Data volume and storage costs
- Real-time vs. batch processing trade-offs
- Multi-language support complexity

### 9.3 Business Constraints
- Budget for API access and infrastructure
- Timeline for implementation
- Resource allocation (engineering, data science)
- Integration with existing Blinkit systems (CRM, analytics, product catalog)
- Alignment with Blinkit's product roadmap and business priorities

## 10. Risks & Mitigations

### 10.1 Data Access Risks
- **Risk**: Platform API changes or access revocation
- **Mitigation**: Diversify data sources, implement fallback mechanisms

### 10.2 Data Quality Risks
- **Risk**: Spam, bots, or low-quality content
- **Mitigation**: Implement content filtering, quality scoring

### 10.3 Bias Risks
- **Risk**: Biased data leading to skewed insights
- **Mitigation**: Regular bias audits, diverse source representation

### 10.4 Scalability Risks
- **Risk**: System unable to handle data volume growth
- **Mitigation**: Cloud-native architecture, horizontal scaling design

## 11. Deliverables

1. **Data Pipeline**: Automated ingestion from all specified sources
2. **NLP Engine**: Sentiment, topic, and intent analysis capabilities
3. **Analytics Platform**: Query and analysis interface
4. **Dashboard**: Visual representation of key insights
5. **API**: Programmatic access to insights and data
6. **Documentation**: Technical and user documentation
7. **Reports**: Regular insight reports for stakeholders

## 12. Future Enhancements

- Real-time alerting for emerging trends
- Predictive modeling for category exploration
- Integration with recommendation systems
- A/B testing framework for discovery features
- Multi-modal analysis (text, images, video)
- Competitive intelligence features
- International expansion support

---

**Document Version**: 1.0  
**Last Updated**: July 21, 2026  
**Status**: Draft for Review

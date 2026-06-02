# AI Hedge Fund Platform — System Architecture & Implementation Plan

## Executive Summary

This document defines the complete architecture for a professional-grade AI-powered trading intelligence platform covering equities and crypto. The system integrates real-time market data, multi-source sentiment analysis, advanced technical and fundamental analysis, on-chain crypto metrics, AI-driven signal aggregation via Claude, and comprehensive backtesting. It is designed as a modular, event-driven platform that can be built incrementally without breaking earlier phases.

---

## 1. Full System Architecture

### High-Level Module Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AI HEDGE FUND PLATFORM                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  DATA INGEST │  │  PROCESSING  │  │   AI ENGINE  │  │   FRONTEND   │   │
│  │    LAYER     │  │    LAYER     │  │    LAYER     │  │    LAYER     │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                  │                  │           │
│  ┌──────▼───────────────────────────────────────────────────────▼───────┐   │
│  │                     MESSAGE BUS (Kafka / Redis Streams)               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│         │                 │                  │                  │           │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐   │
│  │  TIME-SERIES │  │  RELATIONAL  │  │  VECTOR DB   │  │  CACHE LAYER │   │
│  │   DATABASE   │  │   DATABASE   │  │  (Embeddings)│  │    (Redis)   │   │
│  │ (TimescaleDB)│  │ (PostgreSQL) │  │   (Qdrant)   │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Subsystem Breakdown

```
┌────────────────────────────────────────────────────────────────────────┐
│  DATA INGEST LAYER                                                     │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │Market Data  │  │Social/News  │  │Fundamentals │  │  On-Chain   │  │
│  │Collector    │  │Collector    │  │Collector    │  │  Collector  │  │
│  │             │  │             │  │             │  │             │  │
│  │Alpaca/Poly  │  │Twitter API  │  │SEC EDGAR    │  │Glassnode    │  │
│  │gon.io       │  │Reddit API   │  │Polygon.io   │  │Nansen       │  │
│  │Binance WS   │  │StockTwits   │  │Quandl       │  │Etherscan    │  │
│  │Coinbase WS  │  │Google Trends│  │OpenBB       │  │Blockchain   │  │
│  │             │  │NewsAPI      │  │             │  │.com API     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│  PROCESSING LAYER                                                      │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Technical  │  │  Sentiment  │  │  Options    │  │  Crypto     │  │
│  │  Analysis   │  │  Analysis   │  │  Analytics  │  │  Analytics  │  │
│  │  Engine     │  │  Engine     │  │  Engine     │  │  Engine     │  │
│  │             │  │             │  │             │  │             │  │
│  │Market Prof  │  │NLP pipeline │  │GEX calc     │  │Funding rate │  │
│  │Volume Prof  │  │Divergence   │  │Max pain     │  │OI tracking  │  │
│  │MTF trends   │  │index        │  │PCR series   │  │Fear/Greed   │  │
│  │Structure    │  │Event tagging│  │Unusual actv │  │Whale alerts │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Fundamental│  │  Alert      │  │  Backtest   │  │  Portfolio  │  │
│  │  Analysis   │  │  Engine     │  │  Engine     │  │  Engine     │  │
│  │             │  │             │  │             │  │             │  │
│  │Insider parse│  │Block trade  │  │Strategy     │  │Kelly crit.  │  │
│  │Earnings mdl │  │Short squeeze│  │Event backts │  │Correlation  │  │
│  │Macro overlay│  │Sentiment spk│  │Walk forward │  │Eff frontier │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│  AI ENGINE LAYER (Claude API)                                          │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Signal     │  │  Document   │  │  Trade      │  │  Pattern    │  │
│  │  Aggregator │  │  Analyst    │  │  Thesis     │  │  Recognizer │  │
│  │             │  │             │  │  Generator  │  │  (Journal)  │  │
│  │Multi-source │  │10-K/10-Q    │  │Risk/reward  │  │Win/loss     │  │
│  │fusion       │  │Earnings call│  │Sizing output│  │pattern      │  │
│  │Confidence   │  │Summary+RAG  │  │Conviction   │  │feedback     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│  FRONTEND LAYER                                                        │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Advanced   │  │  Sentiment  │  │  Portfolio  │  │  Trading    │  │
│  │  Chart View │  │  Dashboard  │  │  Dashboard  │  │  Journal    │  │
│  │             │  │             │  │             │  │             │  │
│  │TradingView  │  │Retail/inst  │  │Factor exp   │  │Trade log    │  │
│  │TPO/Mkt Prof │  │divergence   │  │Sector rot   │  │AI review    │  │
│  │Event overlay│  │Trend flows  │  │Eff frontier │  │Analytics    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Backend

| Component | Choice | Justification |
|---|---|---|
| Primary language | Python 3.12 | Dominant in quant/ML; pandas, numpy, TA-Lib, vectorbt ecosystem |
| API framework | FastAPI | Async-native, automatic OpenAPI docs, WebSocket support, high throughput |
| Task queue | Celery + Redis | Mature, distributed task scheduling for periodic jobs |
| Message bus | Apache Kafka | Durable, partitioned, replay-capable event streaming — critical for tick data |
| Cache | Redis 7 | Sub-millisecond reads for hot market data, pub/sub for live updates |
| Background jobs | APScheduler | Lightweight scheduler for data fetches running inside the app process |

### Databases

| Component | Choice | Justification |
|---|---|---|
| Time-series data | TimescaleDB (PostgreSQL extension) | Native time-series compression, continuous aggregates, stays in the Postgres ecosystem, handles 100M+ tick rows |
| Relational / operational | PostgreSQL 16 | Accounts, journal, fundamentals, options snapshots, all foreign-key safe |
| Vector / semantic | Qdrant | Fast ANN search for document embeddings (10-K, earnings calls), open source |
| Object / blob storage | MinIO (self-hosted S3-compatible) | Raw document storage (PDFs, filings), backtesting result archives |
| In-memory | Redis | Real-time order book snapshots, live signal cache, session state |

### Frontend

| Component | Choice | Justification |
|---|---|---|
| Framework | Next.js 14 (React) | App router, server components for fast initial loads, API routes |
| Charting (primary) | TradingView Lightweight Charts | Handles high-frequency OHLCV data, extensible for custom overlays |
| Charting (advanced) | D3.js | TPO/Market Profile charts, IV surface, gamma exposure heatmaps — TradingView cannot render these natively |
| State management | Zustand + React Query | Zustand for UI state, React Query for server cache and real-time polling |
| Real-time updates | WebSockets (native) + Socket.io | Live price, alert, and signal streaming to frontend |
| UI components | shadcn/ui + Tailwind CSS | Accessible, composable, dark-mode-first; professional trading aesthetic |
| Data tables | TanStack Table v8 | Virtualized rows for large option chains and tick data |

### AI / ML

| Component | Choice | Justification |
|---|---|---|
| LLM | Claude API (claude-sonnet-4-6 for analysis, claude-haiku-3-5 for fast tasks) | Long context window for 10-K ingestion, structured output, tool use |
| Embeddings | Voyage AI via Claude ecosystem or OpenAI text-embedding-3-small | Document search and semantic retrieval |
| Sentiment NLP | FinBERT (HuggingFace) | Domain-specific financial text sentiment — outperforms generic models |
| Technical ML | scikit-learn + LightGBM | Feature-based regime detection, earnings surprise modeling |
| Backtesting | VectorBT Pro | GPU-accelerated, pandas-native, handles event-based strategies |

### Infrastructure

| Component | Choice | Justification |
|---|---|---|
| Containerization | Docker + Docker Compose (dev), Kubernetes (prod) | Reproducible environments, horizontal scaling of data collectors |
| Reverse proxy | Nginx | WebSocket proxying, SSL termination |
| Monitoring | Prometheus + Grafana | System health, Kafka lag, API latency dashboards |
| Logging | Loki + Grafana | Structured log aggregation without Elasticsearch complexity |
| Secrets management | HashiCorp Vault or environment-based in early phases | API key rotation, credential security |

---

## 3. Data Source Mapping

### Market Data

| Data Type | Primary Source | Fallback | Notes |
|---|---|---|---|
| US equities real-time | Alpaca Markets WebSocket | Polygon.io WebSocket | Alpaca free tier is 15-min delayed; paid for real-time |
| US equities historical | Polygon.io REST | Yahoo Finance (yfinance) | Polygon is the production standard |
| Crypto real-time | Binance WebSocket | Coinbase Advanced Trade WS | Both streams simultaneously for cross-venue spread |
| Crypto historical | Binance REST API | CryptoCompare | Full OHLCV back to 2017 |
| Options chain data | Tradier API or Polygon Options | Alpaca Options | Full chain snapshots, Greeks |
| Options historical | CBOE DataShop | Unusual Whales API | Costly; prioritize in Phase 4 |
| Futures/VIX | CBOE real-time (delayed free) | Interactive Brokers API | For macro context |

### Sentiment & Social

| Data Type | Source | Notes |
|---|---|---|
| Twitter/X streaming | Twitter API v2 Filtered Stream | Requires Basic tier ($100/mo); track specific user IDs |
| Reddit sentiment | Pushshift (Reddit API v2) | Rate-limited; cache aggressively |
| StockTwits | StockTwits API (free tier) | Symbol-specific streams |
| Google Trends | pytrends library (unofficial) | No official API; rate-limit sensitive |
| News headlines | NewsAPI.org + Benzinga API | Benzinga for financial-specific news with tickers |
| SEC filings alerts | SEC EDGAR Full-Text Search API | Free, official, real-time 8-K/10-K/Form 4 alerts |

### Fundamental & Options Analytics

| Data Type | Source | Notes |
|---|---|---|
| SEC Form 4 (insiders) | SEC EDGAR XBRL API | Free; parse XML/XBRL for structured transactions |
| Short interest | FINRA OTC Transparency + Quandl FINRA | Updated twice monthly from FINRA |
| Earnings data | Earnings Whispers API or Alpha Vantage | EPS estimates, surprise history |
| Macro calendar | Investing.com scrape or Econoday API | Fed dates, CPI, NFP schedule |
| Dark pool prints | Unusual Whales API | $50/mo; dark pool + block trade data |
| ETF flows | ETF.com data or Bloomberg (expensive) | Sector rotation signals |
| Put-call ratio | CBOE free data (delayed) or Polygon | Daily PCR per symbol |
| Max pain / GEX | Calculated internally from options chain | No external source; computed from Polygon chain data |

### Crypto On-Chain

| Data Type | Source | Notes |
|---|---|---|
| Exchange flows | Glassnode API | Best-in-class; $29/mo standard tier |
| Whale wallets | Nansen API or Whale Alert | Nansen for Ethereum ecosystem labeling |
| BTC hash rate | Blockchain.com API | Free |
| Funding rates | Binance REST + Bybit REST | Perpetuals funding across venues |
| Open interest | Coinglass API | Free tier available |
| Fear & Greed | Alternative.me API | Free, single endpoint |

---

## 4. Implementation Phases

### Phase 1 — Foundation & Data Infrastructure (Weeks 1–6)
**Milestone: Live price data flowing into TimescaleDB with a working API layer**

- Set up Docker Compose environment: PostgreSQL + TimescaleDB, Redis, Kafka (single-broker dev mode)
- Create database schemas: OHLCV hypertables for equities and crypto, assets table, data_sources table
- Build Market Data Collector service: Alpaca WebSocket for equities, Binance WebSocket for crypto
- Implement Kafka producer from data collectors; Kafka consumer writing to TimescaleDB
- Build REST API with FastAPI: endpoints for OHLCV candles, asset list, health check
- Basic Next.js frontend shell: TradingView Lightweight Charts wired to the API, single asset view
- Implement continuous aggregates in TimescaleDB for 1m, 5m, 15m, 1h, 4h, 1D candles from tick data
- Historical data backfill jobs: Polygon.io for equities (5 years), Binance REST for crypto (5 years)
- CI pipeline: GitHub Actions running linting and basic API tests

Deliverable: A working chart showing live BTC and a US equity with multi-timeframe candles.

---

### Phase 2 — Technical Analysis Engine (Weeks 7–11)
**Milestone: Full indicator suite computed and rendered on charts**

- Integrate TA-Lib via Python wrapper; compute EMA (9/21/50/200), RSI, MACD, VWAP, Bollinger Bands server-side on candle fetch
- Implement Market Profile calculator: TPO chart logic, POC detection, VAH/VAL computation from tick volume distribution
- Implement Volume Profile: fixed-range, session, visible-range variants using TimescaleDB time-bucket queries
- Multi-timeframe trend detection service: classify each timeframe as uptrend/downtrend/ranging using higher high/lower low logic and EMA alignment
- Market structure module: break of structure (BOS) and change of character (CHoCH) detection
- Frontend: render TPO chart using D3.js (custom component), add POC/VAH/VAL horizontal lines to TradingView chart
- Add indicator overlay UI controls to chart (toggle each indicator)
- Implement indicator caching in Redis with TTL keyed by symbol+timeframe+indicator

Deliverable: Full charting suite matching a professional platform for TA practitioners.

---

### Phase 3 — Sentiment & Social Intelligence (Weeks 12–17)
**Milestone: Timestamped sentiment events overlaid on price charts**

- Set up Twitter API v2 Filtered Stream: track user IDs for POTUS, Elon Musk, Fed chairs, key investors; stream to Kafka topic `social.raw`
- Build FinBERT sentiment scorer: consume `social.raw`, classify sentiment (-1 to +1), extract mentioned tickers, publish to `social.scored`
- Persist scored events to PostgreSQL `social_events` table with symbol, source, timestamp, score, raw_text
- Reddit collector: poll r/wallstreetbets, r/investing, r/cryptocurrency via pushshift; batch sentiment scoring
- StockTwits stream integration
- Build sentiment aggregation service: rolling 1h/4h/24h sentiment moving average per symbol
- Retail vs. institutional divergence index: compare social sentiment (retail proxy) against options flow and dark pool data (institutional proxy)
- Google Trends collector: scheduled job fetching keyword volumes for top watched symbols; store in TimescaleDB
- Frontend: event overlay on TradingView chart — render colored markers (green/red/yellow) at timestamps of significant events, show tweet/headline text on hover
- Sentiment dashboard page: divergence index, trending symbols by social volume

Deliverable: Live tweet events visible on price chart with hover detail; sentiment dashboard live.

---

### Phase 4 — Options Analytics Engine (Weeks 18–23)
**Milestone: GEX levels on chart, PCR time-series, max pain, unusual activity alerts**

- Integrate Polygon.io Options snapshots API: scheduled pull of full option chain per watched symbol (hourly during market hours)
- Store chain snapshots in PostgreSQL `options_chains` table
- Implement Gamma Exposure (GEX) calculator:
  - For each strike: GEX = open_interest * gamma * contract_size * spot_price^2 * 0.01
  - Aggregate by strike and expiry; net dealer GEX
  - Publish GEX levels as horizontal lines on price chart
- Max pain calculator: iterate strikes, sum intrinsic value of all options; find minimum
- Put-call ratio: compute per-symbol daily PCR from chain data; persist as time-series for visualization
- Unusual options activity detector: flag prints exceeding 3x average daily volume at a strike, very high IV relative to historical, out-of-the-money large blocks
- Dark pool / block trade collector: integrate Unusual Whales API; stream to alert engine
- Implied volatility surface: compute IV surface grid (moneyness x expiry) from chain data using Black-Scholes inversion; render as D3.js 3D surface
- Short interest ingestion: FINRA twice-monthly download, parse and store; build short squeeze score (high SI + high days-to-cover + low float + price above key level)
- SEC Form 4 parser: poll EDGAR RSS feed for Form 4 filings; parse XBRL; extract insider name, transaction type, shares, price; compute net insider activity rolling 30/90 days

Deliverable: Options dashboard live with GEX chart overlay, max pain line, unusual activity feed.

---

### Phase 5 — Crypto-Specific Analytics (Weeks 24–28)
**Milestone: On-chain dashboard live alongside crypto price charts**

- Glassnode integration: exchange net flows (BTC and ETH), exchange balances, SOPR, NUPL, realized price
- Funding rate collector: Binance + Bybit perpetuals; persist as time-series; annotate on crypto charts when funding exceeds threshold (e.g., >0.1%)
- Open interest aggregation: Coinglass API for cross-exchange OI; track OI divergence from price (OI rising + price falling = potential squeeze)
- Whale wallet tracker: Whale Alert webhook / Nansen API for large on-chain movements; classify as exchange deposit (bearish) or exchange withdrawal (bullish)
- Hash rate monitor: Blockchain.com API; plot alongside BTC price
- Fear & Greed index: Alternative.me daily pull; persist as time-series and display on crypto dashboard
- On-chain alert rules: exchange inflow spike, whale deposit cluster within 24h, OI-price divergence
- Crypto dashboard frontend page: all on-chain metrics in one view with synchronized timelines

Deliverable: Full crypto on-chain intelligence dashboard.

---

### Phase 6 — AI Engine (Weeks 29–36)
**Milestone: Claude generating trade theses, document summaries, and portfolio sizing recommendations**

- SEC EDGAR document ingestion pipeline:
  - Detect new 10-K/10-Q/8-K/earnings call transcript filings via EDGAR full-text search API
  - Download PDF/HTML, extract text, chunk into 2000-token segments
  - Embed chunks using Voyage AI embeddings; store in Qdrant with metadata (company, filing type, date)
- RAG (Retrieval-Augmented Generation) query layer: on analyst query, retrieve top-K relevant chunks from Qdrant, pass to Claude with structured prompt for synthesis
- Signal aggregation module: at configurable interval (e.g., every 15 minutes), collect all active signals for a symbol across all subsystems; format structured context payload
- Trade thesis generator: pass signal context to Claude with system prompt defining role as senior analyst; structured output includes: thesis text, supporting signals, risk factors, suggested entry zone, invalidation level
- Risk/reward scorer: Claude evaluates setup quality 1–10 with reasoning
- Kelly Criterion position sizer: given win rate (from backtest history or manual estimate), avg win/loss, account size; compute optimal f and suggested position size
- Portfolio construction: pass current positions + new signal to Claude for correlation-aware sizing; avoid concentration
- Document Q&A interface: frontend chat panel allowing user to query any loaded 10-K/earnings call; streamed Claude responses with source citations
- AI review of trading journal (see Phase 7 for journal): weekly job summarizes journal entries, identifies loss patterns, produces coaching report

Deliverable: AI trade thesis panel live, document Q&A working, position sizing outputs present.

---

### Phase 7 — Backtesting Engine & Trading Journal (Weeks 37–43)
**Milestone: Strategy backtests runnable, journal operational with AI review**

- VectorBT Pro integration: wrap VectorBT strategy runner with a FastAPI endpoint accepting strategy definition JSON
- Indicator-based strategy builder: UI for composing entry/exit rules from available indicators (e.g., RSI < 30 AND price > VWAP AND market structure = uptrend)
- Event-based backtesting: given event type (e.g., POTUS tweet, positive earnings surprise, unusual options print), test price performance over N periods post-event using historical event database
- Metrics computation: Sharpe ratio, Sortino ratio, max drawdown, win rate, profit factor, expectancy, avg hold time
- Walk-forward test executor: split data into in-sample / out-of-sample windows; run optimization on IS, validate on OOS; report degradation
- Setup invalidation detector: flag backtested setups where the original thesis (e.g., holding above POC) was violated during the trade
- Backtest result storage: MinIO for full equity curve CSVs; PostgreSQL for summary metrics
- Trading journal module:
  - Trade entry form: symbol, direction, entry price, size, thesis (free text + AI-suggested), screenshots, tags
  - Exit logging: exit price, P&L, outcome notes
  - Journal database schema in PostgreSQL
  - Performance analytics: win rate by setup type, by session, by market condition
  - AI weekly review: Claude ingests last 30 journal entries, identifies recurring mistakes, produces structured coaching output
- Frontend: backtesting UI with equity curve chart, metrics table, strategy editor; journal pages with trade cards and analytics dashboard

Deliverable: Full backtest workflow live; journal capturing trades with AI-powered review.

---

### Phase 8 — Alert System, Portfolio Tools & Advanced Features (Weeks 44–50)
**Milestone: Real-time alert delivery, portfolio optimizer, full platform integration**

- Alert engine (rule processor):
  - Consume Kafka topics from all subsystems
  - Evaluate configurable alert rules: price touching VAH/VAL/POC, unusual options volume, insider cluster, whale movement, sentiment spike, short squeeze score threshold
  - Publish to `alerts.outbound` Kafka topic
- Alert delivery service: WebSocket push to frontend for in-app alerts; email via SendGrid; optional SMS via Twilio
- Custom alert builder UI: user defines rules with AND/OR conditions across all available signals
- Correlation matrix: compute rolling N-day correlation across all tracked assets; render as color-coded heatmap; alert on unusual correlation breakdowns
- Portfolio optimizer: implement Markowitz efficient frontier using scipy.optimize; input: expected returns (from backtest win rates or user-defined), covariance matrix; output: optimal weights for user-defined risk tolerance
- Factor exposure dashboard: compute beta, value, momentum, quality, and volatility factor loadings per position; aggregate portfolio factor tilt
- ETF flow / sector rotation: ingest ETF.com flow data; compute sector momentum scores; display sector rotation wheel visualization
- Macro event calendar overlay: parse Econoday or Investing.com for Fed/CPI/NFP dates; overlay on all charts as vertical dashed lines
- Earnings calendar: Alpha Vantage earnings calendar endpoint; overlay on individual stock charts; link to AI document summaries
- Final integration pass: ensure all dashboards cross-link (e.g., chart event marker opens AI thesis panel, alert opens relevant chart view)
- Full end-to-end testing, load testing (simulating 500 concurrent users), performance profiling

Deliverable: Production-ready platform with all subsystems interconnected.

---

## 5. Database Schema Design

### TimescaleDB Hypertables (Time-Series)

```sql
-- Core OHLCV tick/candle storage
CREATE TABLE ohlcv (
    time            TIMESTAMPTZ NOT NULL,
    symbol          VARCHAR(20) NOT NULL,
    asset_class     VARCHAR(10) NOT NULL,  -- 'equity' | 'crypto'
    exchange        VARCHAR(20),
    open            NUMERIC(20,8),
    high            NUMERIC(20,8),
    low             NUMERIC(20,8),
    close           NUMERIC(20,8),
    volume          NUMERIC(24,4),
    vwap            NUMERIC(20,8),
    trade_count     INTEGER,
    timeframe       VARCHAR(5) NOT NULL    -- '1m','5m','1h','1D', etc.
);
SELECT create_hypertable('ohlcv', 'time', chunk_time_interval => INTERVAL '1 week');
CREATE INDEX ON ohlcv (symbol, timeframe, time DESC);

-- Sentiment event stream
CREATE TABLE sentiment_events (
    id              BIGSERIAL,
    event_time      TIMESTAMPTZ NOT NULL,
    source          VARCHAR(30) NOT NULL,  -- 'twitter','reddit','stocktwits','news'
    author_handle   VARCHAR(100),
    author_tier     VARCHAR(20),           -- 'vip','institutional','retail'
    raw_text        TEXT,
    url             TEXT,
    symbols         VARCHAR(20)[],         -- Array of extracted tickers
    sentiment_score NUMERIC(4,3),          -- -1.000 to 1.000
    confidence      NUMERIC(4,3),
    engagement_score BIGINT                -- likes + retweets composite
);
SELECT create_hypertable('sentiment_events', 'event_time',
       chunk_time_interval => INTERVAL '1 day');
CREATE INDEX ON sentiment_events USING GIN (symbols);
CREATE INDEX ON sentiment_events (event_time DESC, sentiment_score);

-- Sentiment aggregates (pre-computed rolling averages)
CREATE TABLE sentiment_aggregates (
    time            TIMESTAMPTZ NOT NULL,
    symbol          VARCHAR(20) NOT NULL,
    window          VARCHAR(10) NOT NULL,  -- '1h','4h','24h'
    avg_score       NUMERIC(4,3),
    event_count     INTEGER,
    retail_score    NUMERIC(4,3),
    institutional_score NUMERIC(4,3),
    divergence_index NUMERIC(6,3)
);
SELECT create_hypertable('sentiment_aggregates', 'time',
       chunk_time_interval => INTERVAL '1 day');

-- Options chain snapshots (time-series slices)
CREATE TABLE options_snapshots (
    snapshot_time   TIMESTAMPTZ NOT NULL,
    underlying      VARCHAR(20) NOT NULL,
    expiry          DATE NOT NULL,
    strike          NUMERIC(12,2) NOT NULL,
    option_type     CHAR(1) NOT NULL,       -- 'C' | 'P'
    bid             NUMERIC(10,4),
    ask             NUMERIC(10,4),
    last            NUMERIC(10,4),
    volume          INTEGER,
    open_interest   INTEGER,
    implied_vol     NUMERIC(8,6),
    delta           NUMERIC(8,6),
    gamma           NUMERIC(10,8),
    theta           NUMERIC(10,6),
    vega            NUMERIC(10,6)
);
SELECT create_hypertable('options_snapshots', 'snapshot_time',
       chunk_time_interval => INTERVAL '1 week');
CREATE INDEX ON options_snapshots (underlying, expiry, strike, option_type,
                                   snapshot_time DESC);

-- Computed GEX series
CREATE TABLE gamma_exposure (
    time            TIMESTAMPTZ NOT NULL,
    symbol          VARCHAR(20) NOT NULL,
    strike          NUMERIC(12,2) NOT NULL,
    expiry          DATE NOT NULL,
    gex_value       NUMERIC(20,2),          -- dollars of gamma exposure
    call_gex        NUMERIC(20,2),
    put_gex         NUMERIC(20,2)
);
SELECT create_hypertable('gamma_exposure', 'time',
       chunk_time_interval => INTERVAL '1 day');

-- On-chain metrics (crypto)
CREATE TABLE onchain_metrics (
    time            TIMESTAMPTZ NOT NULL,
    asset           VARCHAR(20) NOT NULL,   -- 'BTC','ETH', etc.
    metric_name     VARCHAR(60) NOT NULL,
    value           NUMERIC(30,8),
    source          VARCHAR(30)
);
SELECT create_hypertable('onchain_metrics', 'time',
       chunk_time_interval => INTERVAL '1 day');
CREATE INDEX ON onchain_metrics (asset, metric_name, time DESC);

-- Funding rates and open interest
CREATE TABLE crypto_derivatives (
    time            TIMESTAMPTZ NOT NULL,
    symbol          VARCHAR(30) NOT NULL,
    exchange        VARCHAR(30) NOT NULL,
    funding_rate    NUMERIC(10,6),
    open_interest_usd NUMERIC(24,2),
    open_interest_contracts NUMERIC(20,2),
    long_liquidations  NUMERIC(20,2),
    short_liquidations NUMERIC(20,2)
);
SELECT create_hypertable('crypto_derivatives', 'time',
       chunk_time_interval => INTERVAL '1 week');

-- Market profile data (TPO sessions)
CREATE TABLE market_profile_sessions (
    session_date    DATE NOT NULL,
    symbol          VARCHAR(20) NOT NULL,
    timeframe       VARCHAR(10) NOT NULL,
    poc             NUMERIC(20,8),
    vah             NUMERIC(20,8),
    val             NUMERIC(20,8),
    value_area_vol  NUMERIC(24,4),
    total_vol       NUMERIC(24,4),
    tpo_data        JSONB,                  -- full TPO letter distribution
    ib_high         NUMERIC(20,8),          -- initial balance high
    ib_low          NUMERIC(20,8)
);
CREATE UNIQUE INDEX ON market_profile_sessions (session_date, symbol, timeframe);
```

### PostgreSQL Relational Tables

```sql
-- Asset registry
CREATE TABLE assets (
    id              SERIAL PRIMARY KEY,
    symbol          VARCHAR(20) UNIQUE NOT NULL,
    name            VARCHAR(200),
    asset_class     VARCHAR(10) NOT NULL,
    exchange        VARCHAR(30),
    sector          VARCHAR(60),
    industry        VARCHAR(100),
    market_cap      NUMERIC(20,2),
    float_shares    NUMERIC(20,0),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Insider transactions (SEC Form 4)
CREATE TABLE insider_transactions (
    id              SERIAL PRIMARY KEY,
    filed_at        TIMESTAMPTZ NOT NULL,
    transaction_date DATE NOT NULL,
    symbol          VARCHAR(20) NOT NULL,
    insider_name    VARCHAR(200),
    insider_title   VARCHAR(100),
    relationship    VARCHAR(50),            -- 'officer','director','10%owner'
    transaction_type VARCHAR(20),           -- 'P' buy, 'S' sell, 'A' award
    shares          NUMERIC(20,2),
    price_per_share NUMERIC(20,4),
    total_value     NUMERIC(24,2),
    shares_owned_after NUMERIC(20,2),
    sec_filing_url  TEXT,
    CONSTRAINT fk_asset FOREIGN KEY (symbol) REFERENCES assets(symbol)
);
CREATE INDEX ON insider_transactions (symbol, transaction_date DESC);

-- Short interest snapshots
CREATE TABLE short_interest (
    id              SERIAL PRIMARY KEY,
    report_date     DATE NOT NULL,
    symbol          VARCHAR(20) NOT NULL,
    short_interest  BIGINT,
    float_shares    BIGINT,
    short_pct_float NUMERIC(8,4),
    days_to_cover   NUMERIC(8,2),
    squeeze_score   NUMERIC(6,3),           -- computed composite
    UNIQUE (report_date, symbol)
);

-- Earnings data
CREATE TABLE earnings (
    id              SERIAL PRIMARY KEY,
    symbol          VARCHAR(20) NOT NULL,
    fiscal_quarter  VARCHAR(10),            -- 'Q1-2025'
    report_date     TIMESTAMPTZ,
    eps_estimated   NUMERIC(10,4),
    eps_actual      NUMERIC(10,4),
    surprise_pct    NUMERIC(8,4),
    revenue_estimated NUMERIC(20,2),
    revenue_actual  NUMERIC(20,2),
    guidance_text   TEXT,
    ai_summary_id   INTEGER                 -- FK to document_summaries
);

-- Document summaries (AI-generated)
CREATE TABLE document_summaries (
    id              SERIAL PRIMARY KEY,
    symbol          VARCHAR(20),
    doc_type        VARCHAR(30),            -- '10-K','10-Q','8-K','earnings_call'
    filing_date     DATE,
    period_of_report DATE,
    raw_storage_path TEXT,                  -- MinIO path
    summary_text    TEXT,
    key_risks       TEXT[],
    key_positives   TEXT[],
    ai_model        VARCHAR(60),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Document chunk embeddings reference table (actual vectors in Qdrant)
CREATE TABLE document_chunks (
    id              SERIAL PRIMARY KEY,
    document_id     INTEGER REFERENCES document_summaries(id),
    chunk_index     INTEGER,
    chunk_text      TEXT,
    qdrant_point_id UUID,
    token_count     INTEGER
);

-- Trading journal
CREATE TABLE journal_trades (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    symbol          VARCHAR(20) NOT NULL,
    asset_class     VARCHAR(10) NOT NULL,
    direction       VARCHAR(5) NOT NULL,    -- 'long' | 'short'
    entry_time      TIMESTAMPTZ NOT NULL,
    exit_time       TIMESTAMPTZ,
    entry_price     NUMERIC(20,8),
    exit_price      NUMERIC(20,8),
    quantity        NUMERIC(20,8),
    gross_pnl       NUMERIC(20,4),
    fees            NUMERIC(20,4),
    net_pnl         NUMERIC(20,4),
    entry_thesis    TEXT,
    exit_notes      TEXT,
    setup_tags      VARCHAR(50)[],          -- ['vwap_reclaim','poc_bounce','earnings_play']
    timeframe_used  VARCHAR(5),
    market_condition VARCHAR(20),           -- 'trending','ranging','volatile'
    risk_reward_planned NUMERIC(6,2),
    max_adverse_excursion NUMERIC(20,8),
    max_favorable_excursion NUMERIC(20,8),
    screenshots     TEXT[],                 -- MinIO paths
    ai_review_id    INTEGER,
    status          VARCHAR(20) DEFAULT 'open'
);
CREATE INDEX ON journal_trades (user_id, entry_time DESC);
CREATE INDEX ON journal_trades USING GIN (setup_tags);

-- AI reviews of journal trades
CREATE TABLE journal_ai_reviews (
    id              SERIAL PRIMARY KEY,
    trade_id        INTEGER REFERENCES journal_trades(id),
    review_date     TIMESTAMPTZ DEFAULT NOW(),
    pattern_identified TEXT,
    mistakes_noted  TEXT[],
    strengths_noted TEXT[],
    coaching_notes  TEXT,
    process_score   INTEGER,                -- 1-10 process quality (divorced from outcome)
    ai_model        VARCHAR(60)
);

-- Backtest results summary
CREATE TABLE backtest_results (
    id              SERIAL PRIMARY KEY,
    strategy_name   VARCHAR(200),
    strategy_config JSONB,                  -- full strategy parameter snapshot
    asset_universe  VARCHAR(20)[],
    start_date      DATE,
    end_date        DATE,
    total_trades    INTEGER,
    win_rate        NUMERIC(6,4),
    profit_factor   NUMERIC(8,4),
    sharpe_ratio    NUMERIC(8,4),
    sortino_ratio   NUMERIC(8,4),
    max_drawdown_pct NUMERIC(8,4),
    expectancy      NUMERIC(20,4),
    total_return_pct NUMERIC(10,4),
    cagr            NUMERIC(8,4),
    is_walk_forward BOOLEAN DEFAULT FALSE,
    is_sample       VARCHAR(10),            -- 'in' | 'out' | 'full'
    result_storage_path TEXT,              -- MinIO path to full equity curve CSV
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Alert definitions
CREATE TABLE alert_rules (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    rule_name       VARCHAR(200),
    rule_type       VARCHAR(50),            -- 'price_level','sentiment_spike',etc.
    conditions      JSONB,                  -- structured condition tree
    delivery        VARCHAR(20)[],          -- ['websocket','email','sms']
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Alert delivery log
CREATE TABLE alert_log (
    id              BIGSERIAL PRIMARY KEY,
    rule_id         INTEGER REFERENCES alert_rules(id),
    triggered_at    TIMESTAMPTZ DEFAULT NOW(),
    payload         JSONB,
    delivery_status VARCHAR(20)
);
```

---

## 6. Key Architectural Decisions

### Decision 1: TimescaleDB over InfluxDB or ClickHouse

TimescaleDB extends PostgreSQL, meaning a single database engine handles both time-series and relational concerns. This eliminates a second database technology in early phases. ClickHouse would offer better raw analytical query throughput at scale (500M+ rows) but requires a separate operational database and more operational complexity. The upgrade path to ClickHouse exists if query performance becomes a bottleneck — the schema design above is compatible with a migration.

### Decision 2: Kafka over RabbitMQ

Kafka's durable, replayable log is non-negotiable for a trading system. When the sentiment engine is upgraded or the GEX calculator changes, old events can be replayed. RabbitMQ cannot replay consumed messages. The cost is higher operational complexity; this is accepted. In development, a single-broker Kafka setup in Docker is entirely manageable.

### Decision 3: Claude API for AI vs. Fine-tuned Local Model

Running a local model (e.g., Mistral 7B) would reduce per-query cost at scale but would produce meaningfully inferior results for complex document analysis (10-K summarization, multi-signal thesis generation). The 200K token context window of Claude is load-bearing for analyzing full annual reports. Claude is used for complex, high-value tasks; FinBERT handles high-volume low-latency sentiment scoring where per-unit cost matters.

### Decision 4: Server-side Indicator Computation vs. Client-side

All indicator computation runs server-side and results are cached in Redis. The alternative — shipping raw OHLCV to the browser and computing in JavaScript — creates security exposure (raw data visible to client), inconsistency across sessions, and scaling problems with multi-timeframe queries. The trade-off is slightly higher API latency for initial chart loads, mitigated by Redis caching.

### Decision 5: TradingView Lightweight Charts + D3.js Over Pure Custom

TradingView Lightweight Charts handles the hard problems (WebGL rendering, crosshair sync, high-frequency data) for standard candles and indicators. D3.js is only used for truly custom visualizations that TradingView cannot render: TPO charts, IV surfaces, GEX heatmaps, correlation matrices. A pure D3 implementation for all charts would be a 6-month detour.

### Decision 6: VectorBT Over Backtrader or Zipline

VectorBT uses vectorized NumPy/Pandas operations rather than event-loop simulation. For strategy sweeps testing thousands of parameter combinations across multi-year histories, VectorBT is 10–100x faster. Backtrader's event-loop approach remains useful for execution-realistic single-run backtests; a thin Backtrader adapter can be added if needed. Zipline is largely unmaintained.

### Decision 7: Separate Kafka Topics per Data Domain

Topics are organized as `market.ohlcv`, `social.raw`, `social.scored`, `options.snapshots`, `onchain.metrics`, `alerts.outbound`, `signals.computed`. This prevents a slow consumer (e.g., AI thesis generation) from blocking low-latency consumers (e.g., alert engine). Consumer groups allow independent processing pipelines to read the same data independently.

---

## 7. Risk and Compliance Considerations

### Data & API Risk

Every external data source is a dependency that can break. Implement circuit breakers on all collectors: if a source returns errors for >5 consecutive minutes, fall back to last known values, flag data staleness in the UI with a visible warning banner, and page the operator. Never silently serve stale data on a financial platform.

Rate limits are a daily operational concern. Implement an API rate-limit tracker per source with leaky bucket enforcement in the data collector layer. Polygon.io and Twitter API both enforce hard limits; exceeding them results in 429 errors and temporary bans.

### Legal and Regulatory Risk

The platform must carry prominent disclosures: this is analytical and educational tooling, not licensed investment advice. The AI trade thesis feature specifically should include static disclaimer text on every output: "This is not financial advice. AI-generated analysis may contain errors. Verify all signals independently before trading."

Form 4 insider data and short interest data are public EDGAR/FINRA data — their use is legal. Dark pool data from Unusual Whales reflects publicly reported post-trade transparency data, also legal. Twitter data scraping beyond API terms is illegal; only use the official API.

If the platform ever connects to broker APIs for actual order execution, it enters regulated territory (broker-dealer rules, best execution requirements). For this design, the system stops at signal generation and does not place orders. Keeping this boundary clear is the most important compliance decision.

### Data Storage and Security Risk

All API keys are stored in environment variables, never in source code. In production, these move to HashiCorp Vault. Database credentials follow the same pattern.

The Qdrant and TimescaleDB instances must not be publicly accessible. Bind all database ports to localhost or a private Docker network. The only public-facing surface is the Nginx reverse proxy.

SEC EDGAR filings and third-party API data may have redistribution restrictions. Read each provider's terms of service before displaying data to multiple users.

### AI Model Risk

Claude outputs for trade theses must be treated as one input among many, not as authoritative signals. Implement a mandatory human-in-the-loop principle: the AI suggests, the user decides. Never automate order entry based on Claude output without explicit user confirmation and multi-step acknowledgment.

Hallucination risk in document summarization is real. Always display source citations with AI document summaries so users can verify the underlying text. The RAG architecture (retrieving actual chunks) substantially reduces hallucination compared to asking Claude from memory.

### System Risk

For a live trading intelligence platform, uptime matters. Implement health check endpoints on all services. Use Docker health checks so containers restart automatically on crash. Kafka consumer lag monitoring via Prometheus alerts ensures data pipelines are not silently falling behind.

Protect against runaway Kafka consumer loops or infinite retry storms by implementing exponential backoff with dead-letter queues.

---

## 8. Module Complexity Estimates

| Module | Complexity | Primary Reason |
|---|---|---|
| Market data ingestion (equities + crypto) | Medium | WebSocket management, reconnection logic, multi-venue normalization |
| OHLCV storage and continuous aggregates | Low | TimescaleDB handles this natively with good documentation |
| Standard indicators (EMA, RSI, MACD, etc.) | Low | TA-Lib wraps these; integration is mechanical |
| Market Profile / TPO engine | High | Custom volume distribution bucketing logic; TPO chart D3 rendering is novel |
| Volume Profile | Medium | Simpler binning than Market Profile; still requires accurate tick data |
| Multi-timeframe trend + structure detection | Medium | Rule-based logic with many edge cases (failed BOS, etc.) |
| Twitter streaming + FinBERT scoring pipeline | Medium | API auth complexity; FinBERT model hosting adds infra component |
| Retail/institutional divergence index | High | Defining and calibrating a meaningful index requires iteration |
| Event overlay on price chart | Medium | TimescaleDB join across OHLCV and events tables; frontend marker rendering |
| GEX calculation | High | Financially subtle; dealer vs. customer positioning assumptions; data quality dependent |
| IV surface computation + 3D rendering | High | Black-Scholes inversion across entire chain; D3 3D surface is complex frontend work |
| Max pain calculation | Low | Straightforward loop over option chain strikes |
| PCR time-series | Low | Simple aggregation from chain snapshots |
| Unusual options activity detection | Medium | Statistical baseline definition; tuning false positive rate |
| Short squeeze scoring | Medium | Composite score design; data source quality (FINRA lag) |
| SEC Form 4 parser | Medium | XBRL parsing is documented; edge cases in filing formats |
| Glassnode / on-chain integration | Low | Well-documented REST API; data is pre-computed |
| Funding rate + OI tracking | Low | Straightforward API integration |
| Whale wallet tracking | High | Address labeling accuracy; Nansen dataset completeness; defining "significant" thresholds |
| Claude signal aggregation + thesis generation | High | Prompt engineering for consistent structured output; context window management |
| RAG pipeline for documents | Medium | Standard RAG pattern; tuning chunk size and retrieval quality takes iteration |
| Kelly Criterion + portfolio sizing | Low | Well-defined formula; UI design is the main work |
| Indicator-based backtesting (VectorBT) | Medium | VectorBT has a learning curve; strategy DSL design for UI |
| Event-based backtesting | High | Event database alignment with price data; defining clean entry/exit logic around events |
| Walk-forward testing | Medium | Windowing logic; preventing look-ahead bias |
| Trading journal + AI review | Medium | Standard CRUD with good UX design attention needed |
| Alert engine (rule evaluation) | Medium | Rule engine DSL; Kafka consumer throughput for high-frequency checks |
| Portfolio optimizer (efficient frontier) | Medium | scipy.optimize is available; UI design and input gathering are the main challenges |
| Correlation matrix | Low | NumPy/pandas rolling correlation; heatmap rendering with D3 |
| Factor exposure dashboard | High | Factor model construction; getting factor returns data; statistical rigor needed |
| ETF flow / sector rotation | Medium | Data sourcing is the main challenge; visualization is manageable |

---

## 9. Critical Path

The following sequence represents the minimum path to a functioning system. Nothing in Phase 2+ can proceed without its predecessors.

```
1. TimescaleDB + PostgreSQL running with correct schema
        |
        v
2. Kafka broker running with topic definitions
        |
        v
3. Market data collectors (Alpaca WS + Binance WS) producing to Kafka
        |
        v
4. Kafka → TimescaleDB consumer persisting OHLCV
        |
        v
5. FastAPI layer serving candle data from TimescaleDB
        |
        v
6. Frontend chart rendering live candles
        [SYSTEM IS NOW MINIMALLY FUNCTIONAL]
        |
        +---> Technical indicators (server-side, cached Redis)
        |
        +---> Sentiment event collection + FinBERT pipeline
        |           |
        |           v
        |     Event overlay on charts
        |
        +---> Options chain snapshot collector
        |           |
        |           v
        |     GEX + max pain computed
        |
        +---> EDGAR Form 4 parser + short interest
        |
        +---> Claude AI context payload assembler
        |           |
        |           v
        |     Trade thesis generation
        |           |
        |           v
        |     Document RAG pipeline
        |
        +---> VectorBT backtesting endpoint
        |
        +---> Trading journal
        |
        +---> Alert engine (Kafka rule consumer)
        |
        +---> Crypto on-chain collectors
        |
        +---> Portfolio optimizer + factor dashboard
```

The items most commonly underestimated in timeline:

- Data quality issues will consume roughly 30% more time than expected. Raw API data has gaps, outliers, vendor-specific quirks, and undocumented field behaviors. Build data validation and anomaly detection into the ingestion layer early.
- Options data is expensive and complex. Budget significant time for understanding the Greeks and GEX conventions before writing the calculator; subtle sign errors in GEX produce inverted signals.
- The frontend will take longer than the backend. The combination of TradingView custom overlays, D3 TPO charts, and a real-time WebSocket data layer is a significant frontend engineering project in its own right.
- Prompt engineering for consistent Claude structured output is iterative. Budget 2–3 weeks specifically for prompt development and output validation for the trade thesis and document summarization modules.

---

## Additional Recommended Features (Suggested Extensions)

### Regime Detection Engine
Using a Hidden Markov Model or LightGBM classifier trained on realized volatility, volume patterns, and trend alignment to automatically label market regimes (trending, mean-reverting, high-volatility, low-volatility). All signals and strategies are contextualized against the current regime. Complexity: High.

### Order Flow Imbalance Detector
Real-time bid/ask volume delta analysis from Level 2 / order book data (requires exchange-level data feed). Detect absorption, exhaustion, and aggressive order flow that precedes moves. Complexity: High. Requires more expensive data tier.

### Cross-Asset Macro Dashboard
Track DXY, 10-year yield (TNX), gold, oil, VIX, credit spreads (HYG/LQD ratio), and their historical correlations with equity sectors and crypto. When these macro indicators reach historically significant levels, flag them as context for the AI engine. Complexity: Medium.

### Earnings Options Play Screener
Systematically screen for equities with historically predictable implied volatility crush post-earnings, outsized IV premium vs. realized move, or recurring directional bias post-earnings. Complexity: Medium once options data is available from Phase 4.

### Paper Trading Mode
Connect the signal and thesis outputs to a simulated portfolio with virtual capital. Track paper trades automatically when the AI generates a thesis and the user clicks "paper trade this." Provides real-time forward testing without capital risk. Complexity: Low once journal infrastructure exists.

---

### Critical Files for Implementation

Since this is a greenfield system with no existing codebase, the critical files to create first are:

- `/services/market_data/collector.py` - Core logic for WebSocket connections to Alpaca and Binance; the first code that touches live data and produces Kafka messages; all downstream systems depend on this
- `/services/market_data/schema.sql` - TimescaleDB hypertable definitions; must be correct before any data is written; retroactively changing hypertable partitioning strategy is painful
- `/services/ai_engine/thesis_generator.py` - Claude API integration for trade thesis generation; the most architecturally novel component; defines the structured prompt contracts that all upstream signal aggregators must satisfy
- `/services/technical/market_profile.py` - Market Profile / TPO engine; the highest-complexity custom computation in the platform; no off-the-shelf library handles this correctly for financial use; errors here propagate into GEX-level overlays and key price level alerts
- `/frontend/components/charts/AdvancedChart.tsx` - The master chart component integrating TradingView Lightweight Charts with custom D3 overlays, WebSocket price updates, and event markers; the most complex frontend component and the primary user interface through which nearly all analysis is consumed
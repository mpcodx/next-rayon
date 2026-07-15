# TODO
- [x] Inspect repo and locate job_finder scripts
- [ ] Implement lead generator functions in `/home/dev/Documents/job_finder.py`:
  - [ ] SerpAPI “YellowPages-like” lead sourcing (official website/contact URLs)
  - [ ] Optional email enrichment using existing Hunter/Apollo/scrape logic
  - [ ] Export `leads_generated.json` + `leads_generated.csv`
- [ ] Add CLI handler to call lead generation when `--leads-only` is set (remove temporary print)
- [ ] Copy updated script into `/home/dev/Documents/next-rayon/job_finder.py` (currently empty)
- [ ] Smoke test:
  - [ ] `python job_finder.py --leads-only --generate-leads-from jobs_top_scored.json`


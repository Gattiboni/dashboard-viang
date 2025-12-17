create or replace function dashboard.fn_chart_ticket_medio_categoria(
  p_start_date date,
  p_end_date date
)
returns table (
  category_name text,
  avg numeric
)
language sql
stable
as $$
  select
    category_name,
    avg(ticket_medio) as avg
  from dashboard.vw_ml_category_day_enriched
  where data between p_start_date and p_end_date
  group by category_name
  order by avg desc, category_name asc;
$$;

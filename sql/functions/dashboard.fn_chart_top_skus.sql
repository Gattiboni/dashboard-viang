create or replace function dashboard.fn_chart_top_skus(
  p_start_date date,
  p_end_date date
)
returns table (
  product_title text,
  unidades numeric,
  receita numeric
)
language sql
stable
as $$
  select
    product_title,
    sum(unidades_vendidas) as unidades,
    sum(receita_bruta) as receita
  from dashboard.vw_ml_top_skus
  where data between p_start_date and p_end_date
  group by product_title
  order by unidades desc, product_title asc
  limit 10;
$$;
